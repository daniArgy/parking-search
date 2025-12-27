<?php

namespace ParkingSearch\Infrastructure;

class FileCache implements CacheInterface
{
    private string $cacheDir;

    public function __construct(string $cacheDir = __DIR__ . '/../../cache')
    {
        $this->cacheDir = $cacheDir;
        if ($this->cacheDir !== '/tmp' && !file_exists($this->cacheDir)) {
            mkdir($this->cacheDir, 0755, true);
        }
    }

    public function get(string $key): ?string
    {
        $filename = $this->getCacheFilename($key);
        
        if (!file_exists($filename)) {
            return null;
        }

        $data = json_decode(file_get_contents($filename), true);
        
        if (time() > $data['expires']) {
            unlink($filename);
            return null;
        }

        return $data['value'];
    }

    public function set(string $key, string $value, int $ttl = 300): bool
    {
        $filename = $this->getCacheFilename($key);
        $data = [
            'value' => $value,
            'expires' => time() + $ttl
        ];

        return file_put_contents($filename, json_encode($data)) !== false;
    }

    public function has(string $key): bool
    {
        return $this->get($key) !== null;
    }

    private function getCacheFilename(string $key): string
    {
        return $this->cacheDir . '/' . md5($key) . '.cache';
    }
}
