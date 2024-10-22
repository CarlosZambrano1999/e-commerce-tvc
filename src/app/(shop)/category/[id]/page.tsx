'use client'
import { Title } from "@/components";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";

const labels: Record<string, string> = {
  'hogar': 'Hogar',
  'jardineria': 'Jardinería',
  'electrodomesticos': 'Electrodomésticos'
};

interface Props {
  params: {
    id: string; 
  };
}


export default function Categories( {params}: Props){

  const { id } = params;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de productos por página

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8888/productos"); 
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setProducts(data); // 
        console.log('data',data)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log('productos', products);
  // Filtra los productos después de la carga
  console.log('id', labels[id])
  const filteredProducts = products.filter(product => product.nombre_categoria === labels[id]);
  console.log('productosfiltrados', filteredProducts);

  // Calcular el índice de los productos actuales para paginar
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // Cambiar de página
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  if (loading) {
    return <p>Loading...</p>; // Puedes personalizar el mensaje de carga
  }

  return (
    <>
      <Title
        title={`Artículos de ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      {/* Renderizar los productos filtrados */}
      <div className="grid grid-cols-4 sm:grid-cols-3 gap-10 mb-10">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div key={product._id} className="rounded-lg overflow-hidden fade-in">
              <Link href={`/product/${product._id}`}>
                <Image
                  src={product.imagen}
                  alt={product.nombre}
                  className="object-cover rounded-lg"
                  width={300}
                  height={300}
                />
              </Link>

              <div className="p-4 flex flex-col">
                <Link
                  className='hover:text-blue-500'
                  href={`/product/${product._id}`}>
                  <div className="flex justify-between font-bold">
                    <div>{product.nombre}</div>
                    <div>${product.precio}</div>
                  </div>
                </Link>
                <p>${product.descripcion}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>

      {/* Botones de Paginado */}
      <div className="flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="btn-secondary">
          Anterior
        </button>
        <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
          className="btn-secondary">
          Siguiente
        </button>
      </div>
    </>
  );
}