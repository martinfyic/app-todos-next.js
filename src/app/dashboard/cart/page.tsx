import { cookies } from 'next/headers';

import { products, type Product } from '@/products';
import { ItemCard } from '@/shopping-cart';
import { WidgetItem } from '@/components';

export const metadata = {
  title: 'Carrito | Productos',
  description: 'Aquí se listaran todos los productos seleccionados',
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);
    if (product) {
      productInCart.push({ product: product, quantity: cart[id] });
    }
  }

  return productInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {
    [id: string]: number;
  };
  const products = getProductsInCart(cart);

  const subTotalToPay = products.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  const totalToPay = subTotalToPay * 1.21;

  return (
    <>
      <h1 className='mb-24 bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-200 bg-clip-text text-7xl font-semibold text-transparent'>
        Productos en el carrito
      </h1>
      <div className='flex w-full flex-col gap-2 sm:flex-row'>
        <div className='flex w-full flex-col gap-2 sm:w-8/12'>
          {products.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className='flex w-full flex-col text-slate-800 sm:w-4/12'>
          <WidgetItem title='Total a Pagar'>
            <div className='mt-2 flex items-center justify-center'>
              <h3 className='text-3xl font-bold'>$ {totalToPay.toFixed(2)}</h3>
            </div>
            <span className='text-center font-semibold text-gray-600'>
              Impuestos 21%: $ {(subTotalToPay * 0.21).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </>
  );
}
