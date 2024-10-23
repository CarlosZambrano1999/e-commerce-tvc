'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { QuantitySelector } from "@/components";
import {notFound} from "next/navigation";
import { IoAddCircleOutline } from 'react-icons/io5';
import { BACKEND_URI } from '@/app/common';


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
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}/productos/unico/${_id}`);
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

    const handleQuantityChange = (newQuantity: number) => {
      setQuantity(newQuantity);
    };

    // Función para añadir al carrito
    const handleAddToCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProductIndex = cart.findIndex((item: any) => item.producto_id === product._id);
  
      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, actualizar la cantidad
        const existingProduct = cart[existingProductIndex];

        // Sumar la cantidad seleccionada, pero sin exceder el stock
        const newQuantity = existingProduct.cantidad + quantity;

        if (newQuantity <= product.stock) {
          existingProduct.cantidad = newQuantity;
          alert('El producto ya está añadido al carrito');
        } else {
          alert(
            `Solo puedes añadir un máximo de ${product.stock} unidades de este producto`
          );
          existingProduct.cantidad = product.stock; // Limitar al máximo stock disponible
        }

        cart[existingProductIndex] = existingProduct; // Actualizar el producto en el carrito
      } else {
        // Si el producto no está en el carrito, añadirlo
        const newItem = {
          producto_id: product._id,
          cantidad: quantity,
          producto:product
        };

        cart.push(newItem);
        alert('Producto añadido al carrito');
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(cart)); 
      setTimeout(() => {
        window.location.href = '/'; // Redirigir después de 2 segundos
      }, 2000);
      
    };

  
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
          maxQuantity={product.stock}
          onQuantityChange={handleQuantityChange}
        />
        <button onClick={handleAddToCart} className="bg-black pl-5 pr-5 rounded-lg m-5 text-white font-bold flex items-center w-100">
          <IoAddCircleOutline /> Añadir al carrito
        </button>

        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">
          {product.descripcion}
        </p>
      </div>
    </div>
  );
}
