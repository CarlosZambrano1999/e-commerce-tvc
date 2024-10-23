'use client'; 
import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie';
import { IoChevronDownOutline} from "react-icons/io5";
import { BACKEND_URI } from '@/app/common';
import { Title } from '@/components';

export default function Orders() {
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
    const user_id = Cookies.get('user');
    try {
      const response = await fetch(`${BACKEND_URI}/orden/${user_id}`); 
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

  return (
    <>
      <Title title="Mis Ordenes" />

      <div className="mb-10 mt-5">
        <table className="min-w-full mb-5">
          <thead>
            <tr className="text-gray-300 text-sm">
              <th className="px-4 py-2">ORDER ID</th>
              <th className="px-4 py-2">CREADA</th>
              <th className="px-4 py-2">CLIENTE</th>
              <th className="px-4 py-2">TOTAL</th>
              <th className="px-4 py-2">ARTICULOS</th>
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
                    <td className="border px-4 py-2">{order.items}</td>
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
    </>
  );
}
