<?php

require_once __DIR__ . '/../vendor/autoload.php';

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

// Dependency injection
$cache = new FileCache();
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
