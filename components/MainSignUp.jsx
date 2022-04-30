import React, {useState, useContext} from 'react'
import { useRouter } from 'next/router'

import InputWithLabel from './InputWithLabel'
import LoggedInfo from './loggedIn';
import { getJWTToken } from '../harperdb/getJWT'
import { UserContext } from '../context/usercontext';
import Link from 'next/link';

const MainSIgnUp = () => {

    const [user, setUser] = useState({
        username:"",
        password:"",
        cnfPassword:""
    });
    
    const userContext = useContext(UserContext);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState([]);
    const router = useRouter()

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let {username, password, cnfPassword} = user;
        username = username.trim().toLowerCase()
        password = password.trim().toLowerCase()

        setProcessing(true)
        if(validateForm()){
            console.log("No Errors");
            try {
                const res = await fetch("/api/signup", {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({username, password}),
                });
                const resp = await res.json();
                const {error, message} = resp;
                if(!res.ok){
                    throw new Error(error)
                }
                // No errors means user is registered. So let's get the JWT token
                const {response:tokenResp, result:tokenResult} = await getJWTToken(username, password);
                console.log(tokenResp);
                const jwtAccessToken = tokenResult.operation_token;
                if(tokenResp.status == 200 && jwtAccessToken){
                    // This function will store user in global context and JWT token in the localstorage
                    storeUser(username, jwtAccessToken);
                }
                else{
                    router.push('/login')
                }
                
                
            } catch (error) {
                setErrors([error.message])
            }
           finally{ 
               setProcessing(false);
           }
        }
    }

    function storeUser(username, access_token){
        userContext.setUsername(username);
        localStorage.setItem('access_token', access_token);
    }
    const validateForm = () => {
        const {username, password, cnfPassword} = user;
        const errors = [];
        if(username.trim().length < 3){
            errors.push("Username must have atleast 3 Characters");
        }
        if(password.trim().length < 6){
            errors.push("Password must be 6 Characters long");
        }
        if(password !== cnfPassword ){
            errors.push("Passwords didn't match");
        }
        setErrors(errors);
        return errors.length === 0 ;
    }

    // console.log(msg)
    return (
    <>
     {userContext.username?.length > 0 
     ? <LoggedInfo>
         <h2 className=' m-0 p-0 ' > You're logged in as <span className=' text-pink-500' >{userContext.username}</span></h2>
         <Link href={'/quiz'} > 
            <a className=' text-purple-900 underline ' >Take Quiz Here.</a>
         </Link>
     </LoggedInfo> 
     :  <div className='flex flex-col items-center font-mono m-auto '>
            <h1 className=' text-2xl mb-4 font-bold text-white '>Sign Up</h1>   
            <form className={`bg-white shadow-lg rounded px-8 py-5 mb-4 h-fit 
                ${processing && 'opacity-60'}` } 
                method="post" 
                onSubmit={handleSubmit} 
                >
                <InputWithLabel 
                    type={"text"} 
                    label={"Username"} 
                    name={"username"} 
                    placeholder = "Faheem_Khan_123" 
                    value= {user.username} 
                    onChange={changeHandler} 
                />
                <InputWithLabel 
                    type={"password"} 
                    label={"Password"} 
                    name={"password"} 
                    placeholder = "" 
                    value= {user.password} 
                    onChange={changeHandler} 
                />
                <InputWithLabel 
                    type={"password"}  
                    label={"Confirm Password"} 
                    name={"cnfPassword"} 
                    placeholder = "" 
                    onChange={changeHandler} 
                    value= {user.cnfPassword} 
                />
                <button className= 'w-100 bg-teal-500 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' disabled = {processing} type="submit">Sign Up</button>
                {errors.length > 0 && errors.map(e => (
                    <p className='text-red-700 text-xs ml-1 mt-2 ' key={e} > * {e}</p>
                ))}
            </form>
        </div> }
    </>
    )
}

export default MainSIgnUp