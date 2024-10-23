'use client'
import { useEffect, useState } from "react";
import { ProductGridItem } from "./ProductGridItem";

// Número de productos por página
const PRODUCTS_PER_PAGE = 10;

export const ProductGrid = () => {
    const [products, setProducts] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);  // Página actual
    const [totalPages, setTotalPages] = useState(1);    // Total de páginas

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8888/productos"); 
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
                setProducts(data);

                // Calculamos el número total de páginas
                setTotalPages(Math.ceil(data.length / PRODUCTS_PER_PAGE));

            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    // Calcular los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Función para cambiar la página
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-5 sm:grid-cols-4 gap-10 mb-10">
                {
                    currentProducts.map(product => (
                        <ProductGridItem
                            key={product._id}
                            product={product}
                        />
                    ))
                }
            </div>

            {/* Controles de paginado */}
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mr-2 bg-gray-300 border-solid rounded"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Anterior
                </button>
                
                <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
                
                <button
                    className="px-4 py-2 ml-2 bg-gray-300 border-solid rounded"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};
