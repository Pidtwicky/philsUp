
const DOMAIN = "http://192.168.1.32:8080/Stage/Stage_API/";

export default function XHR(pathRequest, callback) {

    let xhr = new XMLHttpRequest();
    let url = DOMAIN + pathRequest;
        
    xhr.open('GET', url, true);
    xhr.onload = () => {

        let response = xhr.response
        console.log("xhr.response : " + response);
        if (isJson(response)) {

            let json = JSON.parse(response);
            callback(json)

        } else {

            console.log('Fichier XHR.js : Mauvais format de réception...')
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