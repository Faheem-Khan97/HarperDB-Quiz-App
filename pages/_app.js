import '../styles/globals.css'
import { UserContext } from '../context/usercontext'
import useLoggedInUser from '../customHooks/useLoggedInUser'

function MyApp({ Component, pageProps }) {
  
  //const [username, setUsername] = useState("")

  const {username, setUsername} = useLoggedInUser()
 
  
  return <UserContext.Provider value = {{username, setUsername}} >
   <Component {...pageProps} /> 

  </UserContext.Provider>
}

export default MyApp
