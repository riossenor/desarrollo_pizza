<?php
session_start();
header('Content-Type: application/json');
require 'conexion.php'; // tu archivo de conexión

if (!isset($_SESSION['id_usuario'])) {
  echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id_usuario = $_SESSION['id_usuario'];
$items = $data['carrito'] ?? [];

if (empty($items)) {
  echo json_encode(['success' => false, 'message' => 'Carrito vacío']);
  exit;
}

// Crear nuevo carrito
$stmt = $conn->prepare("INSERT INTO carrito (id_usuario, monto, fecha, estado) VALUES (?, 0, NOW(), 'activo')");
$stmt->execute([$id_usuario]);
$id_carrito = $conn->lastInsertId();

// Insertar productos
$total = 0;
foreach ($items as $item) {
  $subtotal = $item['price'] * $item['quantity'];
  $total += $subtotal;

  $stmt = $conn->prepare("INSERT INTO carrito_producto (id_carrito, tipo, id_referencia, descripcion, precio_unitario, cantidad, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?)");
  $stmt->execute([
    $id_carrito,
    $item['customizations'] ? 'personalizado' : 'menu',
    $item['id'],
    $item['name'] . ' - ' . $item['customizations'],
    $item['price'],
    $item['quantity'],
    $subtotal
  ]);
}

// Actualizar monto total
$stmt = $conn->prepare("UPDATE carrito SET monto = ? WHERE id_carrito = ?");
$stmt->execute([$total, $id_carrito]);

echo json_encode(['success' => true, 'carrito_id' => $id_carrito]);
