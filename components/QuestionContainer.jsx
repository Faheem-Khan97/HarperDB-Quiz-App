import React from 'react'

const QuestionContainer = (props) => {
  console.log(props)
  const {ques, options, correct_option, id, onNext , index, onPrev, onOptionClick, onSubmit} = props

  return (
    <section className='flex grow justify-center items-center py-6' >
      <div className='md:w-5/6 lg:w-3/4 ' >
        <div className='shadow-sm p-4 rounded-md border-teal-200 border-4' > 
          <h1 className=' text-teal-900 text-md ' >{index+1}. {ques}</h1>
          <div className="options py-5">
            {options?.map(opt => (
              <div key = {opt.id} className='p-1 '>
                <input className='cursor-pointer pr-2' type="radio" name={id} id={opt.id} onClick = {(e) => onOptionClick(id,e.target.id)} />
                <label  className='cursor-pointer pl-2 text-sm' htmlFor={opt.id}>{opt.opt}</label>
              </div>
            ))}
          </div>
        </div>
        <div className=' flex justify-between pt-2 mt-3'>
          <button className=' px-5 py-1 bg-teal-300 text-white rounded-sm border-0 outline-none ' onClick={onPrev} >Prev</button>
         { index !==4 ? <button className=' px-5 py-1 bg-teal-700 text-white rounded-sm border-0 outline-none ' onClick={onNext}  >Next</button>
          :<button className=' px-5 py-1 bg-teal-700 text-white rounded-sm border-0 outline-none ' onClick={onSubmit} >Submit</button>
            }

        </div>
      </div>
      
    </section>
  )
}

export default QuestionContainer