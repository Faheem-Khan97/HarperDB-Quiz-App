import 'dotenv/config';
import { DB_URL } from '../constant/constants';

export const createUser = async ({username, password}) => {

    const SUPER_USER = process.env.SUPER_USER;
    if(!SUPER_USER || !DB_URL){
        console.log("Check harper DB config")
        throw new Error("Internal Server Error");
    }

    const headers = new Headers();
    headers.append('Content-Type', "application/json");
    // Set the Auth header so that Harper DB can validate the request
    headers.append('Authorization', SUPER_USER);

    const dataToSendOverHarperdb = JSON.stringify({
        operation: "add_user",
        role:"standard_user",
        username,
        password,
        active:true,
        progress:0
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

export const getQuestions = async (page, count) =>{
    const SUPER_USER = process.env.SUPER_USER;
    if(!SUPER_USER || !DB_URL){
        console.log("Check harper DB config")
        throw new Error("Internal Server Error");
    }

    const headers = new Headers();
    headers.append('Content-Type', "application/json");
    // Set the Auth header so that Harper DB can validate the request
    headers.append('Authorization', SUPER_USER);
    const offset = (page-1)*count;
    const dataToSendOverHarperdb = JSON.stringify({
        operation: "sql",
        sql: `SELECT * FROM quiz_app.questions OFFSET ${offset} ROWS FETCH NEXT ${count} ROWS ONLY`,
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
export const getTotalQuiz = async () =>{
    const SUPER_USER = process.env.SUPER_USER;
    if(!SUPER_USER || !DB_URL){
        console.log("Check harper DB config")
        throw new Error("Internal Server Error");
    }

    const headers = new Headers();
    headers.append('Content-Type', "application/json");
    // Set the Auth header so that Harper DB can validate the request
    headers.append('Authorization', SUPER_USER);
    const dataToSendOverHarperdb = JSON.stringify({
        operation: "sql",
        sql: `SELECT COUNT (id) FROM quiz_app.questions `,
      });
      const reqOptions  = {
        method: "POST",
        headers: headers,
        body: dataToSendOverHarperdb,
        redirect: "follow",
    }

    const response = await fetch(DB_URL, reqOptions);
    const result = await response.json();
    console.log(result)
    return {response, result}
    
}