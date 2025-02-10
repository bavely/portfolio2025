"use client"
import React from 'react'
import {ModeToggle} from './modetoggle'
import Clock from 'react-live-clock';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import dark_logo from '../assets/logo-dark.svg'
import light_logo from '../assets/logo_white.svg'
const Header = () => {
  
const { theme } = useTheme();

  return (
    <div className='grid grid-cols-2 gap-4 items-center justify-center w-[80%] fixed top-10 z-50'>

        <div className='flex items-start justify-start '>
          {theme === 'dark' ? (
            <Image src={dark_logo} alt="logo" width={250} height={250} />
          ) : (
            <Image src={light_logo} alt="logo" width={250} height={250} />
          )}
            
            
        </div>

        <div className='flex items-center justify-end gap-4 lg:mr-0 md:mr-2 mr-6'>
            
            <ModeToggle />
            <Clock format={'hh:mm:ss A'} ticking={true} className='text-xs' />
            
        </div>
        
    </div>
  )
}

export default Header