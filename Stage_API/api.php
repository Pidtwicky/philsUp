<?php

define( "URL", str_replace("index.php", "", ( isset($_SERVER["HTTPS"])? "https" : "http" )."://".$_SERVER["HTTP_HOST"].$_SERVER["PHP_SELF"] )); //point over site's root url

function sendJSON($infos){

    $infos = transformIntoDataForReact($infos);
    
    header('Accept: application/json');
    header("Acces-Control-Allow-Origin: *");           //specify who can access to the data
    header("Content-Type: application/json");          //specify which kind of data type is sent 
    echo json_encode($infos, JSON_UNESCAPED_UNICODE);
}

function transformIntoDataForReact($infos){

    // $infos = "{'data':" . $infos . ",'error':null}";
    
    $data = array('data'=>$infos);

    return $data;
}

function getGroups(){
    $pdo = getConnexion();
    $query =   "SELECT * FROM .group";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $groups = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();

    sendJSON($groups);
}

function getGroupContent( $id ){
    $pdo = getConnexion();
    $query =   "    SELECT * FROM message 
                    INNER JOIN .group ON .group.id = message.group_entity_id
                    WHERE .group.id = $id";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $groups = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();

    sendJSON($groups);
}

function getUsers(){
    $query =   "SELECT * FROM user";
    $pdo = getConnexion();

    $statement = $pdo->prepare($query);
    $statement->execute();
    $users = $statement->fetchAll(PDO::FETCH_ASSOC);

    // for($i=0; $i < count($users); $i++){
    //     $users[$i]["image"] = URL."assets/images/users/".$users[$i]["image"];
    // }


    $statement->closeCursor();
    sendJSON($users);
}

function getUserInformationById( $id ){
    $pdo = getConnexion();
    $query =   "    SELECT job.name jobName, team.name teamName, email, information.name, firstname FROM user
                    INNER JOIN information ON user.id = information.id
                    INNER JOIN job ON job.id = user.job_id
                    INNER JOIN team on team.id = user.team_id
                    WHERE user.id = $id";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $user = $statement->fetchAll(PDO::FETCH_ASSOC);

    // $user["image"] = URL."assets/images/users/".$user["image"];
    

    $statement->closeCursor();
    sendJSON($user);
}

function getGroupByName( $name ){

    $pdo = getConnexion();
    $query =        "   SELECT * FROM `group`
                        WHERE `group`.`name` LIKE '%$name%' ";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $group = $statement->fetchAll(PDO::FETCH_ASSOC);

    $statement->closeCursor();
    sendJSON($group);
}

function checkEmail( $email ) {

    // $email = htmlentities(['email'])
    return true;
}

function createUser ( $firstname, $name, $email, $password ) {

    $pdo = getConnexion();
    $query =       "   INSERT INTO `user` ( `email`, `password`) 
                        VALUES ( '$email' , '$password' );
    
                        INSERT INTO `information` ( `name` , `firstname`, `user_entity_id` )
                        VALUES ('$name' , '$firstname' , ( SELECT `id` FROM `user` WHERE `email` = '$email'))";

   
    $statement = $pdo->prepare($query);
    $statement->execute();
    $statement->closeCursor();
}


function getConnexion(){
    return new PDO("mysql:host=localhost;dbname=stage_philiance;charset=utf8", "root", "");
}