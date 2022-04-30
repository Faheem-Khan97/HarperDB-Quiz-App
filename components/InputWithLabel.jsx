import React from 'react'

const InputWithLabel = ({label, type, name, placeholder, onChange, value}) => {
  return (
    <div className="mb-5">
            <label className='block text-gray-500 mb-1 ' htmlFor={name}>{label} </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                type={type} name={name} 
                id={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                required 
            />
    </div>
  )
}

export default InputWithLabel