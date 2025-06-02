<?php
include('conexion.php');

$nombre = $_POST['register-name'];
$correo = $_POST['register-email'];
$telefono = $_POST['register-phone'];
$seña = $_POST['register-password'];

// Usa sentencia preparada para evitar SQL Injection
$stmt = $conexion->prepare("INSERT INTO usuarios (nombre_us, correo_us, telefono_us, contrasena_us) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $correo, $telefono, $seña);

if ($stmt->execute()) {
    echo '<script>alert("¡Registro exitoso! Ahora puedes iniciar sesión"); location.href="../index.php";</script>';
} else {
    echo '<script>alert("Error al registrar: ' . $stmt->error . '"); history.back();</script>';
}

$stmt->close();
$conexion->close();
?>
