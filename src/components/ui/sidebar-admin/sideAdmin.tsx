import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import { IoAddCircleOutline, IoCartOutline, IoCubeOutline } from 'react-icons/io5';

export const SideAdmin = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white text-black flex flex-col shadow-lg">
      <div className="p-6">
      <Image
        src={"/imgs/logo-tvc.png"}
        alt="TVC"
        className="absolute mt-1 mr-10 "
        width={30}
        height={30} />
        <h1 className="text-lg font-bold ml-10">Administración</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-6 p-6">
          {/* Icono de Ordenes */}
          <li>
            <Link href="/admin" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
              <IoCartOutline size={20} />
              <span>Ordenes</span>
            </Link>
          </li>
          {/* Icono de Agregar Productos */}
          <li>
            <h1>Productos</h1>
            <Link href="/admin/users" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
              <IoAddCircleOutline size={20} />
              <span>Agregar Productos</span>
            </Link>
          </li>
          {/* Icono de Lista de productos */}
          <li>
            <Link href="/admin/stats" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
              <IoCubeOutline size={20} />
              <span>Lista de Productos</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
