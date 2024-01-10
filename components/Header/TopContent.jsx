import React from 'react'

const TopContent = () => {
  return (
    <div className='flex gap-x-4 justify-center lg:justify-end bg-neutral'>
        <p className='text-base-content cursor-pointer hover:underline hover:text-secondary/80 px-2'>
            Sign in
        </p>
        <p className='text-base-content cursor-pointer hover:underline  hover:text-secondary/80 px-2'>
            Create Account ?
        </p>
    </div>
  )
}

export default TopContent