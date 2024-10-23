'use client';
import { useUIStore } from "@/store/ui/ui-store"
import { useEffect, useState } from 'react';
import Link from "next/link"
import {IoSearchOutline, IoCartOutline, IoPersonCircleOutline} from 'react-icons/io5'
import Image from 'next/image';


export const TopMenu = () =>{
    
    const openSideMenu = useUIStore( state=>state.openSideMenu);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Obtener el carrito desde el localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Actualizar el estado con la cantidad de productos en el carrito
        setCartCount(cart.length);
    }, []);

    return (
        <nav className="flex px-5 justify-between items-center w-full">
            {/*Logo*/ }
            <div>
                <Link
                 href="/">
                        <Image
                        src={"/imgs/logo-tvc.png"}
                        alt="TVC"
                        className="absolute mt-1 mr-10 "
                        width={30}
                        height={30} />
                        <span className="ml-10"> SHOP</span>
                </Link>
            </div>

            {/*Center Menú */}
            <div className="hidden sm:block">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/hogar">
                Hogar
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/jardineria">
                Jardinería
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/electrodomesticos">
                Electrodomésticos
                </Link>
            </div>

            {/*Search, Cart, Menu */}
            <div className="flex items-center">
                <Link href="/search" className="mx-2 hidden sm:block">
                    <IoSearchOutline className="w-5 h-5 absolute top-5 ml-2" />
                    <input 
                type='text'
                placeholder="Buscar Productos"
                className="w-full bg-gray-50 rounded-full pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500" />
                </Link>
                <Link href="/cart">
                    <div className="relative">
                    <span className="absolute text-xs rounded-full px-1  font-bold -top-2 -right-2 bg-blue-700 text-white .rigth-2">
                        {cartCount}
                    </span>
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>

                <button
                onClick={openSideMenu}
                className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                    <IoPersonCircleOutline className="w-5 h-5" />
                </button>
            </div>
        </nav>
    )
}