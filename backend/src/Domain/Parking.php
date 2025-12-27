<?php

namespace ParkingSearch\Domain;

class Parking
{
    private string $id;
    private string $nombre;
    private float $latitud;
    private float $longitud;
    private int $plazasLibres;
    private int $plazasTotales;
    private string $direccion;
    private float $ocupacion;

    public function __construct(
        string $id,
        string $nombre,
        float $latitud,
        float $longitud,
        int $plazasLibres,
        int $plazasTotales,
        string $direccion,
        float $ocupacion = 0.0
    ) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->latitud = $latitud;
        $this->longitud = $longitud;
        $this->plazasLibres = $plazasLibres;
        $this->plazasTotales = $plazasTotales;
        $this->direccion = $direccion;
        $this->ocupacion = $ocupacion;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function getLatitud(): float
    {
        return $this->latitud;
    }

    public function getLongitud(): float
    {
        return $this->longitud;
    }

    public function getPlazasLibres(): int
    {
        return $this->plazasLibres;
    }

    public function getPlazasTotales(): int
    {
        return $this->plazasTotales;
    }

    public function getDireccion(): string
    {
        return $this->direccion;
    }

    public function getOcupacion(): float
    {
        return $this->ocupacion;
    }

    public function getPorcentajeOcupacion(): float
    {
        if ($this->ocupacion > 0) {
            return $this->ocupacion;
        }

        if ($this->plazasTotales === 0) {
            return 0.0;
        }
        return (($this->plazasTotales - $this->plazasLibres) / $this->plazasTotales) * 100;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'latitud' => $this->latitud,
            'longitud' => $this->longitud,
            'plazasLibres' => $this->plazasLibres,
            'plazasTotales' => $this->plazasTotales,
            'direccion' => $this->direccion,
            'ocupacion' => $this->ocupacion,
            'porcentajeOcupacion' => $this->getPorcentajeOcupacion()
        ];
    }
}
