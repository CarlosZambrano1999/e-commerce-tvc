'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, ingresa tu correo electrónico y contraseña.');
      return; // Salir si los campos están vacíos
    }

    try {
      // Construir la URL con los parámetros email y password
      const response = await fetch(`http://localhost:8888/usuarios/verificar/${encodeURIComponent(email)}/${encodeURIComponent(password)}`, {
        method: 'POST', // Método POST
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token y datos del usuario en las cookies
        Cookies.set('token', data.token);
        Cookies.set('usuario', data.usuario);

        // Redirigir dependiendo del rol
        if (data.usuario.rol === 'administrador') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setErrorMessage('Credenciales incorrectas');
      }
    } catch (error) {
      setErrorMessage('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <Image
        src={"/imgs/logo-tvc.png"}
        alt="TVC"
        className="ml-auto mr-auto"
        width={100}
        height={100} />
      <h1 className="text-4xl mb-5">Ingresar</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(''); // Limpiar mensaje de error
          }}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage(''); // Limpiar mensaje de error
          }}
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button onClick={handleLogin} className="btn-primary" disabled={!email || !password}>
          Ingresar
        </button>

        {/* divisor */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>
      </div>
    </div>
  );
}



