import { DB_URL } from '../constant/constants';


export async function getUserWithToken(access_token){
    if(!DB_URL){
        console.log("Check harper DB config")
        throw new Error("Internal Server Error");
    }

    const headers = new Headers();
    headers.append('Content-Type', "application/json");
    headers.append('Authorization', `Bearer ${access_token}`);

    const dataToSendOverHarperdb = JSON.stringify({
        operation: "user_info",
    });
    const reqOptions = {
        method: "POST",
        headers: headers,
        body: dataToSendOverHarperdb,
        redirect: "follow",
    }
    try {
        const response = await fetch(DB_URL, reqOptions);
        const result = await response.json();
        if(response.status == 200){
            return result.username;
        }
    } catch (error) {
        console.log(error);
        // throw new Error(error)
    }
    

    return null;
}