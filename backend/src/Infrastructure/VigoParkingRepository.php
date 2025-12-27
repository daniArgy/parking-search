<?php

namespace ParkingSearch\Infrastructure;

use ParkingSearch\Domain\Parking;
use ParkingSearch\Domain\ParkingRepositoryInterface;

class VigoParkingRepository implements ParkingRepositoryInterface
{
    private const API_URL = 'https://datos.vigo.org/resource/tpak-v6si.json';
    private const CACHE_KEY = 'vigo_parkings';
    private const CACHE_TTL = 300; // 5 minutes

    private CacheInterface $cache;

    public function __construct(CacheInterface $cache)
    {
        $this->cache = $cache;
    }

    public function getAllParkings(): array
    {
        $data = $this->fetchParkingData();
        return $this->mapToParkings($data);
    }

    public function getParkingById(string $id): ?Parking
    {
        $parkings = $this->getAllParkings();
        
        foreach ($parkings as $parking) {
            if ($parking->getId() === $id) {
                return $parking;
            }
        }
        
        return null;
    }

    private function fetchParkingData(): array
    {
        if ($this->cache->has(self::CACHE_KEY)) {
            return json_decode($this->cache->get(self::CACHE_KEY), true);
        }

        $data = $this->fetchFromApi();
        $this->cache->set(self::CACHE_KEY, json_encode($data), self::CACHE_TTL);
        
        return $data;
    }

    private function fetchFromApi(): array
    {
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => 'Accept: application/json',
                'timeout' => 10
            ]
        ]);

        $response = @file_get_contents(self::API_URL, false, $context);
        
        if ($response === false) {
            return [];
        }

        return json_decode($response, true) ?? [];
    }

    private function mapToParkings(array $data): array
    {
        $parkings = [];

        foreach ($data as $item) {
            try {
                $parkings[] = new Parking(
                    id: (string)($item['id'] ?? uniqid()),
                    nombre: (string)($item['nombre'] ?? 'Parking sin nombre'),
                    latitud: (float)($item['latitud'] ?? $item['location']['coordinates'][1] ?? 0),
                    longitud: (float)($item['longitud'] ?? $item['location']['coordinates'][0] ?? 0),
                    plazasLibres: (int)($item['plazas_libres'] ?? 0),
                    plazasTotales: (int)($item['plazas_totales'] ?? 0),
                    direccion: (string)($item['direccion'] ?? '')
                );
            } catch (\Exception $e) {
                // Skip invalid entries
                continue;
            }
        }

        return $parkings;
    }
}
