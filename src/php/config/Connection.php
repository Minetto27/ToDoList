<?php

	$server = "localhost";
	$user = "root";
	$dbname = "todolist";
	$pass = "";

	

	//Criar a conexao
	$conn = mysqli_connect($server, $user, $pass, $dbname);
	
	if(!$conn){
		die("Falha na conexao: " . mysqli_connect_error());
	}
?>