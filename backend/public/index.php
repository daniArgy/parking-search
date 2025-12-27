<?php

// Manual PSR-4 Autoloader (bypassing composer for Vercel compatibility)
spl_autoload_register(function ($class) {
    $prefix = 'ParkingSearch\\';
    $base_dir = __DIR__ . '/../src/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

use ParkingSearch\Infrastructure\FileCache;
use ParkingSearch\Infrastructure\VigoParkingRepository;
use ParkingSearch\Application\GetAllParkingsUseCase;
use ParkingSearch\Application\GetParkingByIdUseCase;
use ParkingSearch\Presentation\ParkingController;

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Detect Vercel environment
$isVercel = getenv('VERCEL') === '1';
$cacheDir = $isVercel ? '/tmp' : __DIR__ . '/../cache';

// Dependency injection
$cache = new FileCache($cacheDir);
$repository = new VigoParkingRepository($cache);
$getAllParkingsUseCase = new GetAllParkingsUseCase($repository);
$getParkingByIdUseCase = new GetParkingByIdUseCase($repository);
$controller = new ParkingController($getAllParkingsUseCase, $getParkingByIdUseCase);

// Simple routing
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$path = parse_url($requestUri, PHP_URL_PATH);
$path = str_replace('/api', '', $path);

if ($requestMethod === 'GET' && $path === '/parkings') {
    $controller->getAllParkings();
} elseif ($requestMethod === 'GET' && preg_match('#^/parkings/(.+)$#', $path, $matches)) {
    $controller->getParkingById($matches[1]);
} else {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Ruta no encontrada']);
}
