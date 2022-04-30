import Image from 'next/image'
import Link from 'next/link'
import React, {useContext, useEffect} from 'react'
import { UserContext } from '../context/usercontext';
import { useRouter } from 'next/router'
import svg from '../images/svgrl.png'
export const MainContent = () => {

    const {username, setUsername} = useContext(UserContext);
    const router = useRouter()
 
    useEffect(() => {
      if(username){
          router.push('/quiz')
      }
    }, [username])
    
  return (
        <div className='flex items-center justify-between lg:justify-around w-full md:w-5/6 mb-6'>

            <div className="left ">
                <h2 className=' leading-loose text-white font-medium lg:text-2xl  ' >Ready to Test Your JavaScript Skills?</h2>
                <div className="btns flex justify-between mt-6 ">
                    <Link href={"/login"} >
                        <a className='py-2.5 px-6 text-teal-500 text-sm tracking-wide bg-white rounded-md ' >Login</a> 
                    </Link>
                    <Link href={"/signup"} >
                        <a className='py-2 px-5 text-sm tracking-wide border-white text-white rounded-md border-2' >Sign Up</a> 
                    </Link>
                
                </div>
            </div>

            <div className="right hidden shadow-2xl shadow-teal-50 drop-shadow-2xl sm:block ">
            <Image 
                src={svg}
                alt="Picture of the author"
                width={195}
                height={170}
            />
            </div>

        </div>
 
  )
}
