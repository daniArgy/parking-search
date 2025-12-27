<?php

namespace ParkingSearch\Domain;

interface ParkingRepositoryInterface
{
    /**
     * @return Parking[]
     */
    public function getAllParkings(): array;

    public function getParkingById(string $id): ?Parking;
}
