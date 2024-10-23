'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { QuantitySelector } from "@/components";
import {notFound} from "next/navigation";

interface Product {
  _id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  nombre_categoria: string;
}

interface Props {
  params: {
    _id: string;
  }
}

export default function ProductId( {params}: Props){
  const { _id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8888/productos/unico/${_id}`);
        if (!response.ok) {
          throw new Error('Error fetching product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    notFound(); // Llamamos a `notFound` si no se encuentra el producto
  }

  
  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/*Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <Image
                  src={product.imagen}
                  alt={product.nombre}
                  className="object-cover"
                  width={300}
                  height={300}
              />
      </div>
      {/*Detalles */}
      <div className="col-span-1 px-5">
        <h1 className="antialiased font-bold text-xl">
          {product.nombre}
        </h1>
        <p className="text-lg mb-5">
          {product.precio} $
        </p>

        <QuantitySelector 
          quantity={1}
        />
        <button className="btn-primary m-5">
          Agregar al carrito
        </button>

        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">
          {product.descripcion}
        </p>
      </div>
    </div>
  );
}
