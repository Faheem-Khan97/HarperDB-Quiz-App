import React from 'react'

const Sidebar = ({totalPages, currPage, setPage}) => {
  return (
    <div className='flex justify-center items-center md:flex-col md:justify-start p-4 ' >
      {totalPages >0?
      <div className="quizzes flex md:flex-col md:justify-start gap-5 overflow-hidden ">
        {new Array(totalPages).fill("  ").map((_, index) => (
          <button key = {index + 1}  className={` outline-none text-white font-mono px-3 py-1 rounded-lg ${currPage == (index + 1) ? "bg-teal-800":"bg-white text-green-700 border-teal-600 border-2 "} `} onClick = {() => setPage(index + 1)} >Quiz - {index+1} </button>
        ))}
      </div> 
    : <div className="loading">
        <h2 className=' text-lg text-teal-900  ' >Loading Quiz.....</h2>
      </div> 
    }
    </div>
  )
}

export default Sidebar