'use client'
import { QuantitySelector, Title } from "@/components";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { IoTrash } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { BACKEND_URI } from "@/app/common";
import axios from "axios";

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
  const router = useRouter();

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

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const handleCheckout = () => {
    const token = getCookie('token');
    if (!token) {
      const confirmed = window.confirm('Para poder ordenar debes Iniciar Sesión ¿deseas Iniciar sesión?');
      if(confirmed){
        router.push('/auth/login');
      }
    } else {
      proceedToCheckout();
    }
  };

  const proceedToCheckout = async () => {
    const token = getCookie('token');
    const cliente_id = getCookie('user');

    // Obtener el carrito de localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Mapeo de productos
    const productos = cart.map(item => ({
      producto_id: item.producto_id,
      cantidad: item.cantidad
    }));


    const totalSum = productsInCart.reduce((acc, product) => acc + (product.producto.precio * product.cantidad), 0)

    if (!token) {
      alert('Debes iniciar sesión para continuar');
      return;
    }

    const requestData = {
      productos,
      total: totalSum,
      items: productos.length,
    };

    console.log(requestData, 'request')
    try {
      const response = await axios.post(`${BACKEND_URI}/orden/crear/${cliente_id}`, requestData);
      if (response.status === 200) {
        alert('Orden creada exitosamente');
        router.push('/orders');
        localStorage.removeItem('cart');
      } else {
        console.error('Error al crear la orden:', response.data);
        alert('Error al crear la orden. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
};

// Función para obtener los datos del producto
const getProductData = async (producto_id) => {
  const response = await axios.get(`${BACKEND_URI}/productos/${producto_id}`);
  return response.data;
};

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title='Carrito' />
        <div className="mt-5 mb-2 w-full text-center">
        {productsInCart.length == 0 && (
          <div>
            <h1>Aún no has agregado ningún elemento</h1>
          </div>
        )}
        {productsInCart.length > 0 && (
          <button className="pl-5 pr-5 m-5 text-black bg-[#f9c301] rounded-full w-[200px] h-[50px]"
            onClick={handleCheckout}>
            Pagar
          </button>
        )}
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
