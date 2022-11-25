<?php 
require ("../model/CrudTask.class.php");

header('Access-Control-Allow-Origin: *');

$action = $_REQUEST['act'];

switch($action){
    case 'newUser':        
        $crud = new CrudTask();
        $rt = $crud->newUser($_REQUEST['username'],$_REQUEST['password']);        
        echo json_encode(['operation' => $rt]);
        break;
    case 'loginUser':
        $crud = new CrudTask();
        $rt = $crud->loginUser($_REQUEST['username'],$_REQUEST['password']);
        $rt = explode('//', $rt);
        echo json_encode(['operation' => $rt[0],
                            'id_user' => $rt[1]]);
        break;
    case 'handleTask':
        $crud = new CrudTask();
        $rt = $crud->viewTask($_REQUEST['userid']);
        if ($rt == 1) {
            echo 1;
        } else {
            echo $rt;
        }        
        break;
    case 'taskCrud':
        $crud = new CrudTask();
        $rt = $crud->processTask($_REQUEST['tasks'],$_REQUEST['id']);    
        echo $rt;
        break;
        
        default: 'nada';
    }