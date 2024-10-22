import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <>
    <nav className='py-4 justify-between px-10 flex items-center '>
      <Link>
      <img src="/logo.png" className='size-24   ' alt="company logo" />
      </Link>
      <Button>Login</Button>




      
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
    </nav>














      {/* <nav className='py-4 px-4 flex justify-between items-center'>
        <Link>
        <img src="/logo.png" alt="" className='h-20' />
        </Link>
        <Button variant="outline">Login</Button> */}


      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
      {/* </nav> */}
    </>
  )
}

export default Header