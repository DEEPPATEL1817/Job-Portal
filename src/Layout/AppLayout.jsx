import Header from '@/components/Header'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'


const AppLayout = () => {
  return (
    <div>
      <div className='grid-background ' ></div>
      <main className='min-h-screen container p-10 '>
        <Header />
        <Outlet />
      </main>
      <div className='p-10 text-center  bg-gray-600 mt-10'>
        
          <div className='flex text-center justify-between'>
          <Link>
          <img src="/logo-dark.png" className='h-20' alt="photo" />
          </Link>
          <div className='flex justify-center items-center' >
            <ul className='flex gap-2 items-center' >
              <li><Link to="/About" className='text-lg sm:hidden hover:opacity-75 duration-200 transition-all'>About </Link></li>
              <li>
                <a href="https://www.facebook.com" target="_blank">
                <img src="/faceboodOG.png" alt="" className=' h-10 w-10 object-fit mt-4 hover:opacity-75 transition-all duration-200'/>
                </a>
                
                </li>
              <li>
                <a href="https://www.x.com" target='_blank'>
                <img src="/X1.jpeg" alt="" className=' h-10 w-10 object-contain mt-4 hover:opacity-75 transition-all duration-200'  />
              </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target='_blank'>
                <img src="/InstagramOg.png" alt="" className=' h-10 w-10  mt-4 object-contain hover:opacity-75 transition-all duration-200' />
              </a>
              </li>
            </ul>
          </div>
          </div>
      </div>
    </div>
  )
}

export default AppLayout