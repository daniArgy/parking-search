<?php

namespace ParkingSearch\Application;

use ParkingSearch\Domain\ParkingRepositoryInterface;

class GetAllParkingsUseCase
{
    private ParkingRepositoryInterface $parkingRepository;

    public function __construct(ParkingRepositoryInterface $parkingRepository)
    {
        $this->parkingRepository = $parkingRepository;
    }

    public function execute(): array
    {
        $parkings = $this->parkingRepository->getAllParkings();
        
        return array_map(function ($parking) {
            return $parking->toArray();
        }, $parkings);
    }
}
