<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include('conexion.php');

$correo = $_POST['login-email'];
$contrasena = $_POST['login-password'];

// Consulta segura con sentencia preparada
$stmt = $conexion->prepare("SELECT id_us, nombre_us FROM usuarios WHERE correo_us = ? AND contrasena_us = ?");
$stmt->bind_param("ss", $correo, $contrasena);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Usuario encontrado
    $stmt->bind_result($id, $nombre);
    $stmt->fetch();
    // Puedes devolver más datos si lo necesitas
    echo json_encode([
        "success" => true,
        "nombre" => $nombre
    ]);
} else {
    // Usuario no encontrado
    echo json_encode([
        "success" => false,
        "message" => "Correo o contraseña incorrectos"
    ]);
}

$stmt->close();
$conexion->close();
?>