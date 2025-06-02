<?php

$host = 'localhost';
$user = 'root';
$contra = '';
$bd = 'masamadre';

$conexion = new mysqli($host, $user, $contra, $bd);

if ($conexion -> connect_erro){
    die('Error'.$conexion->connect_error);

}else{
    echo '<h2>Conexion exitosa</h2>';
}


?>