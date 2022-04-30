import {DB_URL} from '../constant/constants'


export async function getJWTToken(username, password){
    if(!DB_URL){
        console.log("Check harper DB config")
        throw new Error("Internal Server Error");
    }

    const headers = new Headers();
    headers.append('Content-Type', "application/json");
    const dataToSendOverHarperdb = JSON.stringify({
        operation: "create_authentication_tokens",
        username,
        password,
    });
    const reqOptions = {
        method: "POST",
        headers: headers,
        body: dataToSendOverHarperdb,
        redirect: "follow",
    }
    const response = await fetch(DB_URL, reqOptions);
    const result = await response.json();
    return {response, result}
}