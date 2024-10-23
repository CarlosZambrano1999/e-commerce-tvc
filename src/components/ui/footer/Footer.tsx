
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5'

export const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black py-8">
      <div className="container pl-5 mt-[50px] grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-4">
        <div>
          <h1 className="font-medium mb-2 mt-[-10px] text-2xl" style={{ color: '#f9c301' }}> <b> TVC SHOP</b></h1>
          <ul>
            <li className='mb-12'>
                <p className="text-xs font-sans" style={{ width: '75%' }}>
                    Contamos con todos los electrodómesticos e inmobiliaria para que tu casa se convierta en tu hogar</p></li>
            <li className='mb-12'></li>
            <li className='mb-12'>
            <ul className="flex space-x-4 mt-5">
                <li className="flex items-center justify-center p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
                    <IoLogoTwitter size={20} className="text-[#f9c301]" />
                </li>
                <li className="flex items-center justify-center p-2 bg-[#f9c301] rounded-full hover:bg-gray-200 transition-colors">
                    <IoLogoFacebook size={20} className="text-white" />
                </li>
                <li className="flex items-center justify-center  p-2 bg-white rounded-full hover:bg-gray-200 transition-colors" style={{ border: '1px solid #f9c301' }}>
                    <IoLogoInstagram size={20} className="text-[#f9c301]" />
                </li>
            </ul>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2 tracking-widest" style={{ color: '#f9c301' }}>COMPAÑIA</h4>
          <ul>
            <li className='mb-3'><a href="#" className="hover:underline">Acerca</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Solicitudes</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Trabajo</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Conócenos</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2 tracking-widest" style={{ color: '#f9c301' }}>AYUDA</h4>
          <ul>
            <li className='mb-3'><a href="#" className="hover:underline">Soporte</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Detalles de Envíos</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Terminos & Condiciones</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Política de Privacidad</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2 tracking-widest" style={{ color: '#f9c301' }}>FAQ</h4>
          <ul>
            <li className='mb-3'><a href="#" className="hover:underline">Cuenta</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Manejo de Envíos</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Ordenes</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">Pagos</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2 tracking-widest" style={{ color: '#f9c301' }}>NUESTROS SITIOS </h4>
          <ul>
            <li className='mb-3'><a href="#" className="hover:underline">TUNOTA</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">DEPORTESTVC</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">HRN</a></li>
            <li className='mb-3'><a href="#" className="hover:underline">TVC</a></li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-300 h-0.5" ></div>
      <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch mt-5">
        <div>
            <p>© {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
        </div>
        <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch mt-5">
            <Image
                src={"/imgs/visa-logo.png"}
                alt="TVC"
                className="mr-7 bg-white p-2 rounded"
                width={40}
                height={40}
            />
            <Image
                src={"/imgs/mc-logo.png"}
                alt="TVC"
                className="mr-7 bg-white p-2 rounded"
                width={40}
                height={40}
            />
            <Image
                src={"/imgs/paypal-logo.png"}
                alt="TVC"
                className="mr-7 bg-white p-2 rounded"
                width={40}
                height={40}
            />
            <Image
                src={"/imgs/apple-logo.png"}
                alt="TVC"
                className="mr-7 bg-white p-2 rounded"
                width={40}
                height={40}
            />
            <Image
                src={"/imgs/google-logo.png"}
                alt="TVC"
                className="mr-7 bg-white p-2 rounded"
                width={40}
                height={40}
            />
        </div>
      </div>
    </footer>
    
  )
}
