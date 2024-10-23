'use client'
import { QuantitySelector, Title } from "@/components";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { IoTrash } from "react-icons/io5";

type Item = {
  producto_id:string,
  producto: {
    _id:string,
    nombre:string,
    categoria_id:string,
    precio:number,
    descripcion:string,
    imagen:string,
    stock:number,
  },
  cantidad: number
}

export default function Cart(){
  const [productsInCart, setProductsInCart] = useState<Item[]>([]);

  useEffect(() => {
    // Obtener productos del localStorage y parsearlos
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setProductsInCart(cart);
  }, []);

  const handleQuantityChange = (productId:string, newQuantity:number) => {
    // Aquí podrías implementar la lógica para actualizar la cantidad en el carrito
    const updatedCart = productsInCart.map(product => {
      if (product.producto_id === productId) {
        return { ...product, cantidad: newQuantity };
      }
      return product;
    });
    setProductsInCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveProduct = (productId:string) => {
    // Implementa la lógica para eliminar un producto del carrito
    const updatedCart = productsInCart.filter(product => product.producto_id !== productId);
    setProductsInCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title='Carrito' />
        <div className="mt-5 mb-2 w-full text-center">
          <button className="pl-5 pr-5 m-5 text-black bg-[#f9c301] rounded-full w-[200px] h-[50px]">
            Pagar
          </button>
        </div>

        <div className="flex justify-between">
          <div>Total</div>
          <div>{productsInCart.length} items</div>
          <div>
            <b>
              ${productsInCart.reduce((acc, product) => acc + (product.producto.precio * product.cantidad), 0)}
            </b>
          </div>
        </div>
        <div className="bg-gray-200 h-[25px]"></div>

        <div className="grid gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            {/* Items */}
            {productsInCart.map(product => (
              <div key={product.producto_id} className="flex mb-5">
                <Image 
                  src={product.producto.imagen}
                  width={150}
                  height={150}
                  alt={product.producto.nombre}
                  className="mr-5"
                />
                <div>
                  <p><b>{product.producto.nombre}</b></p>
                  <p>{product.producto.descripcion}</p>
                  <QuantitySelector 
                    quantity={product.cantidad} 
                    maxQuantity={product.producto.stock} 
                    onQuantityChange={(newQuantity) => handleQuantityChange(product.producto_id, newQuantity)} 
                  />
                  <button 
                    className="underline mt-3 text-red"
                    onClick={() => handleRemoveProduct(product.producto_id)}
                  >
                    <IoTrash className="text-red-800" />
                  </button>
                </div>
                <div>
                  <p><b>${product.producto.precio}</b></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
