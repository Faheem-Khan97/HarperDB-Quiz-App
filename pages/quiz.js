import React from 'react'
import { useState, useContext} from 'react'
import { UserContext } from '../context/usercontext';
import MainQuizSection from '../components/MainQuizSection';
import LoggedInfo from '../components/loggedIn';
import Link from 'next/link';
import Layout from '../components/Layout';
import ScoreCard from '../components/ScoreCard';


export default function Quiz() {
  const {username, setUsername} = useContext(UserContext);

  return (
    <Layout title="Quiz" bgColor={ "bg-white"} >
      { username?
    <MainQuizSection />
    :  <LoggedInfo >
       <h2 className=' text-lg m-0 p-0 ' >You're not logged in</h2>
       <div className="" > 
         <span>You need to </span>
         <Link href={'/login'} > 
             <a className=' text-purple-900 underline ' >Login Here</a>
         </Link>
         <span> Or </span>
         <Link href={'/signup'} > 
             <a className=' text-purple-900 underline ' > SignUp Here</a>
         </Link>
         <span> to Continue.</span>

       </div>
     
     </LoggedInfo>
     
   } 
    </Layout>
  )
}

