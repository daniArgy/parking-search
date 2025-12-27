<?php

namespace ParkingSearch\Application;

use ParkingSearch\Domain\ParkingRepositoryInterface;

class GetParkingByIdUseCase
{
    private ParkingRepositoryInterface $parkingRepository;

    public function __construct(ParkingRepositoryInterface $parkingRepository)
    {
        $this->parkingRepository = $parkingRepository;
    }

    public function execute(string $id): ?array
    {
        $parking = $this->parkingRepository->getParkingById($id);
        
        return $parking ? $parking->toArray() : null;
    }
}
