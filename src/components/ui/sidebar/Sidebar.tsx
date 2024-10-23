'use client';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoCartOutline, IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar = () => {
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);
    const router = useRouter();

    const Logout = () => {
        const confirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    
        if(confirmed){
          document.cookie.split(";").forEach(cookie => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
          });
      
          router.push('/auth/login');
        }
      };

  return (
    <div>
        {
            isSideMenuOpen && (
                <div
                    className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
                />
            )
        }

        {
            isSideMenuOpen && (
                <div
                    onClick={closeMenu}
                    className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
                />
            )
        }

        <nav className={
            clsx(
                'fixed p-5 right-0 top-0 h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                'w-[100%] xs:w-[200px] sm:w-[250px] md:w-[250px] lg:w-[300px] xl:w-[400px]',
                {
                    "translate-x-full": !isSideMenuOpen
                }
            )
        }>
            <IoCloseOutline
            size={50}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={()=>closeMenu()}
            />

            <div className='relative mt-14'>
                <IoSearchOutline size={20} className='absolute top-2 left-2' 
                />
                <input 
                type='text'
                placeholder="Buscar"
                className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500" />
            </div>

            <Link
                href="/"
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoPersonOutline size={30}/>
                <span className="ml-3 txt-xl">Perfil</span> 
            </Link>

            <Link
                href="/orders"
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoTicketOutline size={30}/>
                <span className="ml-3 txt-xl">Ordenes</span> 
            </Link>

            <Link
                href="/auth/login"
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoLogInOutline size={30}/>
                <span className="ml-3 txt-xl">Ingresar</span> 
            </Link>

            <Link
                href="/auth/login"
                onClick={Logout}
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoLogOutOutline size={30}/>
                <span className="ml-3 txt-xl">Salir</span> 
            </Link>

            <div className='w-full h-px bg-gray--200 my-10' />
            <Link
                href="/"
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoShirtOutline size={30}/>
                <span className="ml-3 txt-xl">Productos</span> 
            </Link>

            <Link
                href="/cart"
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoCartOutline size={30}/>
                <span className="ml-3 txt-xl">Carrito</span> 
            </Link>
        </nav>
    </div>
  )
}
