
<?php

require_once("./api.php");

function handleSpaceFromURL($search)
{

    $res = str_replace("~*-", " ", $search);
    return $res;
}

//www.monsite.fr/formations                         CAS 1
// => www.monsite.fr/index.php?myRequest=formations
// => http://192.168.1.32:8080/Stage/philsUp/Stage_API/index.php?myRequest=groupes

//www.monsite.fr/formations/categorie              CAS 2
// => www.monsite.fr/index.php?myRequest=formations/categorie

//www.monsite.fr/formation/id                      CAS 3
// => www.monsite.fr/index.php?myRequest=formations/id

try {
    if (!empty($_GET["myRequest"])) {
        $url = explode("/", filter_var($_GET["myRequest"], FILTER_SANITIZE_URL));
        switch ($url[0]) {
            case "groupes":
                if (empty($url[1])) { //CAS 1 - empty
                    getGroups();
                } else {
                    if ($url[1] === "nom") {

                        getGroupByName(handleSpaceFromURL($url[2]));
                    } else {
                        getGroupContent($url[1]);
                    }
                }
            break;
                
            case "utilisateurs":
                if (empty($url[1])) { //CAS 1 - empty
                    getUsers();
                } else {
                    getUserInformationById($url[1]);
                }
            break;

            case "inscription":
                if (checkEmail($url[3])) { //CAS 1 - empty
                    createUser($url[1], $url[2], $url[3], $url[4]);
                }
            break;

            case "connexion":
                checkLogin($url[1], $url[2]);
            break;

            default:
                throw new Exception("Le 1er élement de ton chemin n'a pas été traité dans dans la condition Switch() de ton fichier index.php (celui du dossier de l'API), vérifie ton URL ou ajoute le Case correspondant, et tu sera un gros roxxor ;) - Ha ! Oublie pas de créer une fonction qui fait un appel a la base de donnes dans le fichier api.php aussi!");
        }
    } else {
        throw new Exception("Tu as donné un chemin vide patate !");
    }
} catch (Exception $e) {
    $error = [
        "message"   => $e->getMessage(),
        "code"      => $e->getCode()
    ];
    print_r($error);
}