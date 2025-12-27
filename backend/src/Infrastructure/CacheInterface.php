<?php

namespace ParkingSearch\Infrastructure;

interface CacheInterface
{
    public function get(string $key): ?string;

    public function set(string $key, string $value, int $ttl = 300): bool;

    public function has(string $key): bool;
}
