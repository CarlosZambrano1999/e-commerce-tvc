'use client'; 
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie';
import Image from 'next/image';
import { SideAdmin } from '@/components';
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";

export default function Admin() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Número de productos por página

  // Calcular los índices de productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calcular número total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Estado para la imagen seleccionada

  // Función para mostrar la imagen en el modal
  const handleViewImage = (image: string) => {
    setSelectedImage(image);
    console.log('image', image);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const token = Cookies.get('token'); 

    if (!token) {
      router.push('/auth/login');
    }
  }, [router]); 

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8888/productos"); 
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setProducts(data); // 
    } catch (error) {
      console.error("Error fetching products:", error);
    } 
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (productId: string) => {
    const result = confirm("Desea eliminar el producto?");
    if (!result)
      return;
    
    const deleteResponse = await fetch(`http://localhost:8888/productos/eliminarProducto/${productId}`, 
      {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (deleteResponse.status == 200)
      fetchProducts();
    else
      alert('Hubo un problema al eliminar el producto');
  }

  const actualizarProducto = (productId: string) => {
    router.push(`/admin/products?id=${productId}`);
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideAdmin />
      
      {/* Contenido principal */}
      <div className="flex-1 p-10 ml-64">
        <div className="flex justify-between font-bold">
          <div><h1 className="text-3xl">Productos</h1></div>
          <div className='relative'>
            <button
              className="w-12 h-12 rounded-full bg-[#f9c301] flex items-center justify-center">
              <span className="text-black font-bold"></span>
            </button>            
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
        
        {/*contenido de la página */}
        <div>
          <ul className="flex flex-wrap text-sm font-bold text-center text-gray-500 border-b border-gray-100 dark:border-gray-100 dark:text-gray-200">
              <li className="me-2 border-b-[#f9c301]">
                  <a href="#" aria-current="page" className="inline-block p-4 bg-gray-100 text-[#f9c301] rounded-t-lg active dark:bg-gray-100">Todos los productos</a>
              </li>
          </ul>
        </div>

        {/*Tabla */}
        <div>
          <table className="table-auto w-full mb-5">
            <thead>
              <tr className="text-gray-300 text-sm">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">NOMBRE</th>
                <th className="px-4 py-2">CATEGORIA</th>
                <th className="px-4 py-2">PRECIO</th>
                <th className="px-4 py-2">DESCRIPCION</th>
                <th className="px-4 py-2">STOCK</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{`${product._id.slice(0, 4)}${product._id.slice(-2)}`}</td>
                  <td className="border px-4 py-2">{product.nombre}</td>
                  <td className="border px-4 py-2">{product.nombre_categoria}</td>
                  <td className="border px-4 py-2">{product.precio}</td>
                  <td className="border px-4 py-2">{product.descripcion}</td>
                  <td className="border px-4 py-2">{product.stock}</td>
                  <td className="border px-4 py-2">
                    <button 
                      className="bg-[#f9c301] pl-5 pr-5 rounded-lg m-5 text-white"
                      onClick={() => handleViewImage(product.imagen)}
                    >
                      Ver Imagen
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button onClick={() => deleteProduct(product._id)}>
                      <IoTrashOutline />
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button onClick={() => actualizarProducto(product._id)}>
                      <IoCreateOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
         </table>

      {/* Modal para mostrar la imagen */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <button className="text-red-500 mb-3" onClick={handleCloseModal}>
              Cerrar
            </button>
            <Image src={selectedImage} alt="Producto" width={300} height={300}  />
          </div>
        </div>
      )}


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
}

