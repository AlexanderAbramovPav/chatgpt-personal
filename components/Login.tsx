'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

function Login() {
  return (
    <div className='bg-[#11A37F] h-screen xs:h-[100svh] flex flex-col items-center justify-center text-center'>

      <Image 
        src='https://i.ibb.co/y4sLK2S/GPTlogo.png'
        width={300}
        height={300}
        alt='GPTlogo'
      />

       <button onClick={() => signIn("google")} className='text-white font-bold text-3xl animate-pulse hover:scale-105 duration-500'>Sign In to use ChatGPT</button>
    </div>
  )
}

export default Login