<?php

namespace ParkingSearch\Tests;

use PHPUnit\Framework\TestCase;
use ParkingSearch\Domain\Parking;

class ParkingTest extends TestCase
{
    public function testParkingCreation(): void
    {
        $parking = new Parking(
            '1',
            'Parking Centro',
            42.2406,
            -8.7207,
            50,
            100,
            'Calle Principal, 1',
            50.0
        );

        $this->assertEquals('1', $parking->getId());
        $this->assertEquals('Parking Centro', $parking->getNombre());
        $this->assertEquals(42.2406, $parking->getLatitud());
        $this->assertEquals(-8.7207, $parking->getLongitud());
        $this->assertEquals(50, $parking->getPlazasLibres());
        $this->assertEquals(100, $parking->getPlazasTotales());
        $this->assertEquals('Calle Principal, 1', $parking->getDireccion());
        $this->assertEquals(50.0, $parking->getOcupacion());
    }

    public function testPorcentajeOcupacion(): void
    {
        $parking = new Parking(
            '1',
            'Parking Centro',
            42.2406,
            -8.7207,
            25,
            100,
            'Calle Principal, 1',
            75.0
        );

        $this->assertEquals(75.0, $parking->getPorcentajeOcupacion());
    }

    public function testPorcentajeOcupacionCalculado(): void
    {
        $parking = new Parking(
            '1',
            'Parking Centro',
            42.2406,
            -8.7207,
            25,
            100,
            'Calle Principal, 1',
            0.0 // Sin ocupación previa
        );

        $this->assertEquals(75.0, $parking->getPorcentajeOcupacion());
    }

    public function testPorcentajeOcupacionConCeroPlazas(): void
    {
        $parking = new Parking(
            '1',
            'Parking Centro',
            42.2406,
            -8.7207,
            0,
            0,
            'Calle Principal, 1',
            0.0
        );

        $this->assertEquals(0.0, $parking->getPorcentajeOcupacion());
    }

    public function testToArray(): void
    {
        $parking = new Parking(
            '1',
            'Parking Centro',
            42.2406,
            -8.7207,
            50,
            100,
            'Calle Principal, 1',
            50.0
        );

        $array = $parking->toArray();

        $this->assertIsArray($array);
        $this->assertArrayHasKey('id', $array);
        $this->assertArrayHasKey('nombre', $array);
        $this->assertArrayHasKey('ocupacion', $array);
        $this->assertArrayHasKey('porcentajeOcupacion', $array);
    }
}
