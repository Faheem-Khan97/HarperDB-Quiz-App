import React from 'react'

const LoggedInfo = ({children}) => {
  return (
    <div className='w-screen flex flex-col items-center justify-center text-sm md:text-md ' >
        <div className=' p-10 bg-white text-teal-800 flex flex-col rounded-sm gap-5 shadow-md ' >
            {children}
        </div>
    </div>
  )
}

export default LoggedInfo