<?php

namespace ParkingSearch\Presentation;

use ParkingSearch\Application\GetAllParkingsUseCase;
use ParkingSearch\Application\GetParkingByIdUseCase;

class ParkingController
{
    private GetAllParkingsUseCase $getAllParkingsUseCase;
    private GetParkingByIdUseCase $getParkingByIdUseCase;

    public function __construct(
        GetAllParkingsUseCase $getAllParkingsUseCase,
        GetParkingByIdUseCase $getParkingByIdUseCase
    ) {
        $this->getAllParkingsUseCase = $getAllParkingsUseCase;
        $this->getParkingByIdUseCase = $getParkingByIdUseCase;
    }

    public function getAllParkings(): void
    {
        try {
            $parkings = $this->getAllParkingsUseCase->execute();
            ApiResponse::success($parkings);
        } catch (\Exception $e) {
            ApiResponse::error('Error al obtener los parkings: ' . $e->getMessage(), 500);
        }
    }

    public function getParkingById(string $id): void
    {
        try {
            $parking = $this->getParkingByIdUseCase->execute($id);
            
            if ($parking === null) {
                ApiResponse::error('Parking no encontrado', 404);
                return;
            }
            
            ApiResponse::success($parking);
        } catch (\Exception $e) {
            ApiResponse::error('Error al obtener el parking: ' . $e->getMessage(), 500);
        }
    }
}
