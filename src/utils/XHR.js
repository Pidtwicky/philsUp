
const DOMAIN = "http://192.168.1.139:80/STAGE/philsUp/Stage_API/";

export default function XHR(pathRequest, callback){

    let xhr = new XMLHttpRequest();
    let url = DOMAIN + pathRequest;
    // let test = 'test';
        
    xhr.open('GET', url, true);
    xhr.onload = () => {

        let response = xhr.response
        
        if (isJson(response)) {

            let json = JSON.parse(response);
            callback(json);
            console.log("Les données reçus de l'API sont les suivantes \n:  : " + response);

        } else {

            console.log("L'erreur reçue de l'API est la suivante : \n" + response);
        }
    }
    xhr.send();
}

function isJson(str) {

    try {

        let json = JSON.parse(str)
        return true

    } catch (e) {

        return false
    }
}