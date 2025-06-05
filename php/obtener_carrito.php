<?php
session_start();
header('Content-Type: application/json');
require 'conexion.php';

if (!isset($_SESSION['id_usuario'])) {
  echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
  exit;
}

$id_usuario = $_SESSION['id_usuario'];

// Obtener carrito activo
$stmt = $conn->prepare("SELECT id_carrito FROM carrito WHERE id_usuario = ? AND estado = 'activo' ORDER BY fecha DESC LIMIT 1");
$stmt->execute([$id_usuario]);
$row = $stmt->fetch();

if (!$row) {
  echo json_encode(['success' => false, 'message' => 'No hay carrito activo']);
  exit;
}

$id_carrito = $row['id_carrito'];

// Obtener productos
$stmt = $conn->prepare("SELECT * FROM carrito_producto WHERE id_carrito = ?");
$stmt->execute([$id_carrito]);
$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

$carrito = array_map(function($item) {
  return [
    'id' => $item['id_referencia'],
    'name' => $item['descripcion'],
    'customizations' => '', // puedes parsear si necesitas
    'price' => floatval($item['precio_unitario']),
    'quantity' => intval($item['cantidad']),
    'image' => "placeholder.jpg" // puedes cargar imagen del producto si la obtienes
  ];
}, $productos);

echo json_encode(['success' => true, 'carrito' => $carrito]);
