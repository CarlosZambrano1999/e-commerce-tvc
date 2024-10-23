interface SeedProduct {
    nombre:string,
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
    products : [
        {
            descripcion: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            imagen:"1740176-00-A_0_2000.jpg",
            stock: 7,
            precio: 75,
            nombre: "Men’s Chill Crew Neck Sweatshirt",
            nombre_categoria: "Electrodomesticos",
            _id:"1"
        },
        {
            descripcion: "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            imagen:"1740507-00-A_0_2000.jpg",               
            stock: 5,
            precio: 200,
            nombre: "Men's Quilted Shirt Jacket",
            nombre_categoria: 'Electrodomesticos',
            _id:"2"
        },
        
        {
            descripcion: "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
            imagen:"1740250-00-A_0_2000.jpg",
                
            stock: 10,
            precio: 130,
            nombre: "Men's Raven Lightweight Zip Up Bomber Jacket",
            nombre_categoria: 'Electrodomesticos',
            _id:"1"
        },
    ]
}