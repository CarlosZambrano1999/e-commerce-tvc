'use client'; 

import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie';
import { SideAdmin } from '@/components';
import { IoChevronDownOutline} from "react-icons/io5";
import { BACKEND_URI } from '@/app/common';


export default function Orders(){
  const router = useRouter();
  const token = Cookies.get('token'); 


  const [orders, setOrders] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]); 

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/orden`); 
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setOrders(data); // 
    } catch (error) {
      console.error("Error fetching orders:", error);
    } 
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

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

  if(!!token){
    return (
      <div className="flex">
        {/* Sidebar */}
        <SideAdmin />
        
        {/* Contenido principal */}
        <div className="flex-1 p-10 ml-64">
          <div className="flex justify-between font-bold">
            <div><h1 className="text-3xl">Ordenes</h1></div>
            <div className='relative'>
              <button
                className="w-12 h-12 rounded-full bg-[#f9c301] flex items-center justify-center"
                onClick={Logout}>
                <span className="text-black font-bold"></span>
              </button>            
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
          
          {/*contenido de la página */}
          <div className='mb-15'>
            <ul className="flex flex-wrap text-sm font-bold text-center text-gray-500 border-b border-gray-100 dark:border-gray-100 dark:text-gray-200">
                <li className="me-2 border-b-[#f9c301]">
                    <a href="#" aria-current="page" className="inline-block p-4 bg-gray-100 text-[#f9c301] rounded-t-lg active dark:bg-gray-100">Pendientes</a>
                </li>
            </ul>
          </div>

          {/*Tabla */}
          <div>
            <table className="table-auto w-full mb-5 mt-5">
              <thead>
                <tr className="text-gray-300 text-sm">
                  <th className="px-4 py-2">ORDER ID</th>
                  <th className="px-4 py-2">CREADA</th>
                  <th className="px-4 py-2">CLIENTE</th>
                  <th className="px-4 py-2">TOTAL</th>
                  <th className="px-4 py-2">STATUS</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="border px-4 py-2">{`${order._id.slice(0, 4)}${order._id.slice(-2)}`}</td>
                    <td className="border px-4 py-2">
                      {new Intl.DateTimeFormat('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      }).format(new Date(order.fecha_creacion))}
                    </td>
                    <td className="border px-4 py-2">{order.nombre_cliente}</td>
                    <td className="border px-4 py-2">${order.total}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2">
                      <button>
                        <IoChevronDownOutline />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>

        {/* Paginación */}
        <div className="flex justify-center">
          <nav>
            <ul className="inline-flex space-x-2">
              {/* Botón "Anterior" */}
              <li>
                <button
                  className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-500 text-white'}`}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
              </li>

              {/* Números de páginas */}
              {[...Array(totalPages)].map((_, i) => (
                <li key={i}>
                  <button
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-[#f9c301] text-white' : 'bg-gray-500 text-white'}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              {/* Botón "Siguiente" */}
              <li>
                <button
                  className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-500 text-white'}`}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
          </div> 
        </div>
      </div>
    );
  }else{
    return(
      <div>Cargando...</div>
    );
  }
}
