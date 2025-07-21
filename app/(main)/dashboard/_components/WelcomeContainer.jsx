"use client"
import { useUser } from '@/app/provider'
import Image from 'next/image';
import React from 'react'

function WelcomeContainer() {
    const { user } = useUser();
  return (
    <div  className='bg-white p-5 rounded-2xl flex justify-between items-center'>
      <div>
        <h2 className='text-xl font-bold'>Welcome back, {user?.name}</h2>
        <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring</h2>
      </div>
      {user && <Image src={user.picture} alt='userAvatar' 
      width={40} height={40}
      className='w-[50px] h-[50px] rounded-full'
       /> }
    </div>
  )
}

export default WelcomeContainer
