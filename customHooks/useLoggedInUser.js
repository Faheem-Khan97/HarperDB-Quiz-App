import {useState, useEffect} from 'react'
import { getUserWithToken } from '../harperdb/getuserwithtoken';

const useLoggedInUser = () => {

  const [username, setUsername] = useState(null);

  useEffect(() => {
    // If user already set in the global context, just return
    if(username) return;

    const access_token = localStorage.getItem('access_token');
    //If there was no access_token , simply return 
    if(!access_token) return 
    // Send access token to harperdb in order to check whether it's valid
    loginUserWithToken(access_token);




  }, [])
  

  async function loginUserWithToken(access_token){
    
    const username = await getUserWithToken(access_token);
    if(username){
        setUsername(username);
    }


  }
  return {
      username,
      setUsername
  }
  
}

export default useLoggedInUser