<?php

define("URL", str_replace("index.php", "", (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://" . $_SERVER["HTTP_HOST"] . $_SERVER["PHP_SELF"])); //point over site's root url

function sendJSON($infos){

    $infos = transformIntoDataForReact($infos);

    header('Accept: application/json');
    header("Acces-Control-Allow-Origin: *");           //specify who can access to the data
    header("Content-Type: application/json");          //specify which kind of data type is sent 
    echo json_encode($infos, JSON_UNESCAPED_UNICODE);
}

function transformIntoDataForReact($infos){

    // $infos = "{'data':" . $infos . ",'error':null}";

    $data = array('data' => $infos);
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

function getGroupContent($id){

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

    for($i=0; $i < count($users); $i++){
        //URL = adresse du site (actuellement Localhost) - puis on y ajoute le chemin vers lequel on stocke l'image des utilisateurs + le nom de l'image ($user[$i]["avatar"])
        $pathToImageFolder = URL . "../assets/images/avatars/" . $users[$i]["avatar"];
        $users[$i]["avatar"] = $pathToImageFolder;
    }

    $statement->closeCursor();
    sendJSON($users);
}

function getUserInformationById($id){

    $pdo = getConnexion();
    $query =   "    SELECT job.name jobName, team.name teamName, email, information.name, information.firstname, information.avatar FROM user
                    INNER JOIN information ON user.id = information.user_entity_id
                    INNER JOIN job ON job.id = user.job_id
                    INNER JOIN team on team.id = user.team_id
                    WHERE user.id = $id";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $user = $statement->fetchAll(PDO::FETCH_ASSOC);

    $pathToImageFolder = URL . "../assets/images/avatars/" . $user[0]["avatar"];
    $user[0]["avatar"] = $pathToImageFolder;

    $statement->closeCursor();
    sendJSON($user);
}

function getGroupByName($name){

    $pdo = getConnexion();
    $query =        "   SELECT * FROM `group`
                        WHERE `group`.`name` LIKE '%$name%' ";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $group = $statement->fetchAll(PDO::FETCH_ASSOC);

    $statement->closeCursor();
    sendJSON($group);
}

function checkEmail($email){

    $pdo = getConnexion();
    $query = " SELECT id FROM user WHERE user.email = '$email' ";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $id = $statement->fetchAll(PDO::FETCH_ASSOC);

    $statement->closeCursor();
    sendJSON($id);

    if (empty($id)) {
        return true;
    }
    return false;
}

function createUser($firstname, $name, $email, $password){
    $pdo = getConnexion();
    $query =       "    INSERT INTO `user` ( `email`, `password`, `team_id`, `job_id`) /*A terme, faire la creation de compte en demandant a l'utilisateur d'entrer lui meme les informations de sa team + poste*/
                        VALUES ( '$email' , '$password', 1, 1 );
    
                        INSERT INTO `information` ( `name` , `firstname`, `user_entity_id`, `avatar` )
                        VALUES ('$name' , '$firstname' , ( SELECT `id` FROM `user` WHERE `email` = '$email'), 'new.jpg')";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $statement->closeCursor();
}

function checkLogin($email, $password){

    $pdo = getConnexion();
    $query =   "    SELECT id, `password` FROM user
                    WHERE email = '$email' ";

    $statement = $pdo->prepare($query);
    $statement->execute();
    $user = $statement->fetchAll(PDO::FETCH_ASSOC);

    $statement->closeCursor();
    sendJSON($user);
}

function getConnexion(){

    $host       = "localhost";
    $dbname     = "stage_philiance";
    $login      = "root";
    $password   = "";

    return new PDO("mysql:host=localhost;dbname=stage_philiance;charset=utf8", "root", "");
}
