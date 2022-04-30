import Link from 'next/link'
import React, {useContext} from 'react'
import { UserContext } from '../context/usercontext';

 const Navbar = () => {

    const {username, setUsername} = useContext(UserContext);
    
    const handleLogoutUser = () => {
        localStorage.removeItem('access_token');
        setUsername ("")
    }
  return (
    <div className='flex justify-between px-5 py-3 items-center  bg-teal-400 text-white ' >
        <div className='ml-5' >
            <h1 className=' font-medium sm:text-2xl ' >Quiz App</h1>
        </div>
        { !username?  
            <div className='flex mr-1 md:mr-8 md:pt-1 ' >
                <NavLink href="/login" > Login </NavLink>
                <NavLink href="/signup" > SignUp </NavLink>
            </div>
        :   <div className='flex mr-1 items-center md:mr-8 md:pt-1 gap-5 md:gap-10 ' >
                <NavLink  href="/quiz" > Take Quiz </NavLink>
                <h4 className='hidden sm:block ' >Welcome,<span className=' text-lg text-pink-200'>{username}</span> </h4>
                <button  className=' cursor-pointer border-white rounded-md px-4 py-1 border-2 ' onClick={handleLogoutUser} > Logout </button>
            </div>
        }

    </div>
  )
}

const NavLink = ({href , children}) => <Link href={href} >
       <a className='mx-6 hover:text-pink-200 text-sm tracking-wide ' >{children}</a> 
    </Link>

export default Navbar