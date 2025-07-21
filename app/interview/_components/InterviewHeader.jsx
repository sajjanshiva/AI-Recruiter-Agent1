import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
      <Image src={'/logo3.png'} alt='logo' width ={100} height={100}
      className='w-[120px]' />
    </div>
  )
}

export default InterviewHeader
