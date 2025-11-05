import React from 'react'

const Title = ({ title, subTitle }) => {
  return (
    <>
    <div className="flex items-center w-full">
      <h1 className='font-medium text-3xl'>{title}</h1>
    </div>
    <p className='text-sm md:text-base text-gray-500/99 mt-2 max-w-156'>{subTitle}</p>
    </>
  )
}

export default Title