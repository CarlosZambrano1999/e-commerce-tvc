import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

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
            <p>
                ${product.descripcion}
            </p>
            
        </div>
    </div>

  )
}
