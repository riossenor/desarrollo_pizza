<?php

$host = 'localhost';
$user = 'root';
$contra = '';
$bd = 'masamadre';

$conexion = new mysqli($host, $user, $contra, $bd);

if ($conexion->connect_error) {
    die('Error: ' . $conexion->connect_error);
}
?>
