import React from 'react'

const Modal = ({children}) => {
  return (
    <div className=' flex items-center justify-center  fixed top-0 left-0 w-screen h-screen z-40 rounded-sm shadow-sm ' >
        <div className="overlay bg-teal-200/50 w-screen h-screen ">

        </div>
        <div className='absolute m-auto bg-white py-5 px-10 flex flex-col items-center justify-center gap-2'>
            {children}
        </div>
    </div>
  )
}

export default Modal