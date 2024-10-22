interface SeedProduct {
    descripcion: string;
    imagen: string;
    stock: number;
    precio: number;
    _id: string;
    nombre_categoria: 'Electrodomesticos'|'Hogar'|'Jardinería'
}


interface SeedData {
    products: SeedProduct[],
}

export const initialData: SeedData = {
    products : []
}