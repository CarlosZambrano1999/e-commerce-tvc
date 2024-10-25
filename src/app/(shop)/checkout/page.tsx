import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]
export default function ChekcOut(){
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title='Verificar Orden' />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/*Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar Elementos</span>
            <Link href="/" className="underline mb-5">
              Editar Carrito
            </Link>
          

          {/*Items*/}
          {
            productsInCart.map(product =>(
              <div key={product.slug} className="flex mb-5">
                <Image 
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5"
                />

                <div>
                  <p>{product.title}</p>
                  <p>{product.price} x 3</p>
                  <p>Subtotal: ${product.price*3}</p>

                  <button className="underline mt-3">
                    Remover
                  </button>
                </div>
              </div>
            ))
          }  
        </div>
          {/*Checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-2xl">Carlos Zambrano</p>
              <p>Residencial La Hacienda</p>
              <p>Edificio Zuniga 1-E</p>
              <p>Tegucigalpa, Honduras</p>
            </div>

            <div 
              className="w-full h-0.5 rounded bg-gray-200 mb-10"/>
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl" >Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123">
                  Colocar Orden
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
