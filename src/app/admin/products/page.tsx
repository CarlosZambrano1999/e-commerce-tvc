'use client'
import { SideAdmin } from '@/components'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useEffect, useState } from "react";

interface LabelsI {
    title: string;
    saveButtonText: string;
    cancelButtonText: string;
    saveAlertMessage: string;
    errorAlertMessage: string;
}

export default function Products(){
    const searchParams = useSearchParams();
    const id: string | null = searchParams.get('id');
    const [estaActualizando, setestaActualizando] = useState(false);
    const [label, setLabel] = useState<LabelsI>({
        title: "Agregar un Producto",
        saveButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        saveAlertMessage: "Producto agregado con éxito",
        errorAlertMessage: "Hubo un problema al agregar el producto",
    });

    const [product, setProduct] = useState({
        nombre: '',
        categoria_id: '',
        precio: '',
        descripcion: '',
        imagen: null,
        stock: '',
        activo: true
      });

    const [categories, setCategories] = useState<any[]>([]);

    const fetchProduct = async (idProducto: string) => {
        try {
          const response = await fetch(`http://localhost:8888/productos/unico/${idProducto}`);
          if (!response.ok) 
            throw new Error('Error fetching product');
          
          const data = await response.json();
          setProduct(data);
          setestaActualizando(true);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
    };

    const limpiarValores = () => {
        setLabel(
            {
                title: "Agregar un Producto",
                saveButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                saveAlertMessage: "Producto agregado con éxito",
                errorAlertMessage: "Hubo un problema al agregar el producto",
            }
        );

        setProduct({
            nombre: '',
            categoria_id: '',
            precio: '',
            descripcion: '',
            imagen: null,
            stock: '',
            activo: true
          });

        setestaActualizando(false);
    }

    useEffect(() => {
        if (id) {
            fetchProduct(id);

            setLabel({
                title: "Actualizar un Producto",
                saveButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                saveAlertMessage: "Producto actualizado con éxito",
                errorAlertMessage: "Hubo un problema al actualizar el producto",
            });
        } else {
            limpiarValores();
        }
    }, [id]);
    
    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
        ...product,
        [name]: value,
        });
    };
    
    
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch("http://localhost:8888/categorias"); 
            if (!response.ok) {
              throw new Error('Error fetching data');
            }
            const data = await response.json();
            setCategories(data); // 
          } catch (error) {
            console.error("Error fetching categories:", error);
          } finally {

          }
        };
    
        fetchCategories();
      }, []);


     // Manejar la selección de imagen
    const handleImageChange = (e) => {
        setProduct({
        ...product,
        imagen: e.target.files[0], // Guardar la imagen seleccionada
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un FormData para enviar la imagen y otros datos
        const formData = new FormData();
            if (estaActualizando && id)
                formData.append("id", id);

            formData.append('nombre', product.nombre);
            formData.append('categoria_id', product.categoria_id); // Asegúrate de usar el ID correcto
            formData.append('precio', product.precio);
            formData.append('descripcion', product.descripcion);
            formData.append('imagen', product.imagen); // Enviar la imagen
            formData.append('stock', product.stock);

        try {
        const response = await fetch(`http://localhost:8888/productos/${product.categoria_id}`, {
            method: 'POST',
            body: formData, // Enviar el FormData
        });

        const data = await response.json();
        if (response.ok) {
            alert(label.saveAlertMessage);
            limpiarValores();
            // Opcional: redireccionar o limpiar el formulario
        } else {
            console.error('Error:', data);
            alert(label.errorAlertMessage);
        }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
    return (
        <div className="flex">
            {/* Sidebar */}
            <SideAdmin />
            
            {/* Contenido principal */}
            <div className="flex-1 p-10 ml-64">
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-center text-2xl font-bold mb-6">{label.title}</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                    
                    {/* Categoría */}
                    <div className="mb-4">
                        <label htmlFor="categoria_id" className="block text-sm font-semibold mb-2">Categoría</label>
                        <select
                            id="categoria_id"
                            name="categoria_id"
                            className="w-full px-4 py-2 border border-gray-50 rounded-md"
                            value={product.categoria_id}
                            onChange={handleChange}
                            >
                            <option value="" disabled selected>Selecciona una categoría</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nombre */}
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-semibold mb-2">Nombre</label>
                        <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Ingresa el Nombre del producto"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={product.nombre}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    {/* Precio */}
                    <div className="mb-4">
                        <label htmlFor="precio" className="block text-sm font-semibold mb-2">Precio</label>
                        <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={product.precio}
                        onChange={handleChange}
                        placeholder="Ingresa el precio del producto"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                        />
                    </div>

                    {/* Cantidad */}
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-sm font-semibold mb-2">Cantidad</label>
                        <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        placeholder="Ingresa la cantidad en stock"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-sm font-semibold mb-2">Descripción</label>
                        <textarea
                        id="descripcion"
                        name="descripcion"
                        placeholder="Ingresa una descripción del producto"
                        value={product.descripcion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
                        required
                        />
                    </div>

                    {/* Imagen */}
                    <div className="mb-4">
                        <label htmlFor="imagen" className="block text-sm font-semibold mb-2">Imagen</label>
                        <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between">
                        <button
                        type="submit"
                        className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-md"
                        >
                        {label.saveButtonText}
                        </button>
                        <button
                        type="button"
                        className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-md"
                        >
                        {label.cancelButtonText}
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
  }
