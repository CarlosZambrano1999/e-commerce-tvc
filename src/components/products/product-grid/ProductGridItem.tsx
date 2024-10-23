import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { IoAddCircleOutline } from 'react-icons/io5';

interface Props {
    product: {
        _id: string;
        nombre: string;
        precio: number;
        descripcion: string ;
        imagen: string;
        fecha_creacion: Date;
        stock: number;
        nombre_categoria: string;
        id_categoria: string;
    };
}
export const ProductGridItem = ( {product} : Props) => {
  return (
    <div className="rounded-lg overflow-hidden fade-in">
        <Link href={`/product/${product._id}`}>
            <Image
                src={product.imagen}
                alt={product.nombre}
                className="object-cover rounded-lg"
                width={200}
                height={200}
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
            <p>
                ${product.descripcion}
            </p>
            <Link 
                className='bg-black pl-5 pr-5 rounded-lg m-5 text-white font-bold flex items-center w-50'
                href={`/product/${product._id}`}>
                <IoAddCircleOutline /> Añadir al carrito
            </Link>
            
        </div>
    </div>

  )
}
