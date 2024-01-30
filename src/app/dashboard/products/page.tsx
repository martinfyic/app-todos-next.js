import { ProductCard, products } from '@/products';

export const metadata = {
  title: 'Products | Listado de TODOs',
  description: 'Aquí se listaran los productos',
};

export default function ProductsPage() {
  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
