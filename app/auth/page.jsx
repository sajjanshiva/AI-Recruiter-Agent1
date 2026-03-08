"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router])

  const signINWithGoogle = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.log('Error:', error.message)
        setLoading(false)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <Image 
          src={"/logo.png"} 
          alt='logo'
          width={100}
          height={100}
          className='w-[180px]'
        />
        <div className='flex flex-col items-center'>
          <Image 
            src={"/login.png"} 
            alt='login'
            width={600}
            height={400}
            className='w-[400px] h-[250px] rounded-3xl'
          />
          <h2 className='text-2xl font-bold text-center'>Welcome to AiCruiter</h2>
          <p className='text-gray-500 text-center'>Sign In with Google Authentication</p>
          <Button 
            className={'mt-7 w-full'}
            onClick={signINWithGoogle}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login with Google'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login