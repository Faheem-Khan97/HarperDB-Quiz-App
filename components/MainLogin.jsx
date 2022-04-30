import React, {useState, useContext} from 'react'
import { UserContext } from '../context/usercontext';
import InputWithLabel from './InputWithLabel'
import LoggedInfo from './loggedIn';
import Link from 'next/link';
import { getJWTToken } from '../harperdb/getJWT'

const MainLogin = () => {

    const [user, setUser] = useState({
        username:"",
        password:"",
    });

    const {username, setUsername} = useContext(UserContext);

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value })
    }

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        let {username, password} = user;
        username = username.trim().toLowerCase()
        password = password.trim().toLowerCase()

        e.preventDefault()
        if(validateForm()){
            // get jwt token for the entered username and password
            try {
                const {response:tokenResp, result:tokenResult} = await getJWTToken(username, password);
                console.log(tokenResp, tokenResult);
                const jwtAccessToken = tokenResult.operation_token;
                if(tokenResp.status == 200 && jwtAccessToken){
                    // This function will store user in global context and JWT token in the localstorage
                    storeUser(username, jwtAccessToken);
                }
                else if(tokenResp.status == 4010){
                    
                    throw new Error("Invalid Credentials")
                }
                else{
                    throw new Error("Something Went Wrong")
                }
            } catch (err) {
                setErrors([err.message]);
            }
            
        }
    }

    function storeUser(username, access_token){
        console.log("inside Stote user")
        setUsername(username);
        localStorage.setItem('access_token', access_token);
    }

    const validateForm = () => {
        const {username, password} = user;
        const errors = [];
        if(username.trim().length < 3){
            errors.push("Check Username");
        }
        if(password.trim().length <= 0){
            errors.push("Password is required");
        }
        setErrors(errors);
        return errors.length === 0 
    }

    return (
        <>
        {username?.length > 0 
        ? <LoggedInfo>
            <h2 className="md:text-lg m-0 p-0 " >You're logged in as <span className=' text-pink-500 md:text-lg ' >{username}</span></h2>
            <Link href={'/quiz'} > 
                <a className="text-purple-900 underline" >Take Quiz Here.</a>
            </Link>
            </LoggedInfo> 
            :<div className='flex flex-col items-center font-mono m-auto '>
                <h1 className=' text-2xl mb-4 font-bold text-white ' >Login</h1>   
                <form className="bg-white shadow-lg rounded px-8 py-5 mb-4 h-fit border-r-2 " method="post" onSubmit={handleSubmit} >
                    <InputWithLabel type={"text"} label={"Username"} name={"username"} placeholder = "Your Username" value= {user.username} onChange={changeHandler} />
                    <InputWithLabel type={"password"} label={"Password"} name={"password"} placeholder = "" value= {user.password} onChange={changeHandler} />
                    <button className= 'w-100 bg-teal-500 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Login</button>
                    {errors.length > 0 && errors.map(e => (
                        <p className='text-red-700 text-xs ml-1 mt-2 ' key={e} > * {e}</p>
                    ))}
                </form>
            </div>}
        </>
    )
}

export default MainLogin