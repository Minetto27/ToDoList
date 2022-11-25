<?php
session_start();



class CrudTask {
    function __constructor() {
        $dataTask = $_REQUEST['data'];
    }

    //Cria um novo usuário
    function newUser(string $username, string $password)
    {
        require_once '../config/Connection.php';

        if ($username != '') {

        $username = strtolower($username);

        $select = 'SELECT name
        FROM users
        WHERE name = "'.$username.'";';

        $res = mysqli_query($conn, $select);

        $rowcount = $res->num_rows;

        if($rowcount == 0){
            $insert = 'INSERT INTO users (name, password) 
            VALUES ("'.$username.'", "'.$password.'")';
    
            $res = mysqli_query($conn, $insert);
        } else {
            $res = 'exist';
        }
    } else {
        $res = 'error';
    }
        return $res;
    }

    //Autentica o usuário
    function loginUser(string $username, string $password)
    {
        require_once '../config/Connection.php';
        
        $select = 'SELECT name, id
        FROM users
        WHERE name = "'.$username.'"
        AND password = "'.$password.'";';

        $res = mysqli_query($conn, $select);
        $returnId = mysqli_fetch_assoc($res);

        $rowcount = $res->num_rows;
        if($rowcount == 0){
            $resp = 'nothing';
        } else {
            $resp = 'logged';
        }   

        return $resp.'//'.$returnId['id'];
    }

    //Carrega as tasks na tela
    function viewTask($id){
        require_once '../config/Connection.php';
        
        $select = 'SELECT id, tasks
        FROM tasks
        WHERE id_user = "'.$id.'"
        LIMIT 1;';

        $resQ = mysqli_query($conn, $select);
        
        $listTask = mysqli_fetch_assoc($resQ);
        
        if ($listTask == '') {
            $data = null;
        } else {
            $data = $listTask['tasks'];
        }
        
        
        if ($data == null) {
            return 1;
        } else {
            return $data;
        }
    }


    //Salva as tasks no bd
    function processTask($tasks, $id_user){
        require_once '../config/Connection.php';

        $select = 'SELECT tasks
        FROM tasks
        WHERE id_user = "'.$id_user.'";';

        $res = mysqli_query($conn, $select);

        $rowcountSe = $res->num_rows;

        if($rowcountSe == 0){
            $insert = "INSERT INTO tasks (id_user, tasks) 
            VALUES ('".$id_user."','".$tasks."')";
    
            $res = mysqli_query($conn, $insert);
        } else {
            $update = "UPDATE tasks SET tasks='$tasks'
            WHERE id_user = '$id_user'";
    
            $res = mysqli_query($conn, $update);
        }

        return $insert;

    
    }
}