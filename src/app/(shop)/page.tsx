import { ProductGrid } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;
export default function Home() {
  return (
    <>
      <div className="m-2">
        <h6>Inicio</h6>
        <h4 className="text-lg mt-2 mb-4"> <b>Nuestros Productos</b></h4>
      </div>

      <ProductGrid
        products={products}/>

    </>
  );
}
