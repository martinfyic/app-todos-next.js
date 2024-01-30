'use client';

// https://tailwindcomponents.com/component/e-commerce-product-card

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  IoAddCircleOutline,
  IoCloseCircleOutline,
  IoTrashOutline,
} from 'react-icons/io5';

import { Star } from './';
import {
  addProductToCart,
  removeProductFromCart,
  removeOneProductFromCart,
} from '@/shopping-cart/actions/actions';

interface Props {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export const ProductCard = ({ id, image, name, price, rating }: Props) => {
  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(id);
    router.refresh();
  };

  const deleteProductFromCart = () => {
    removeProductFromCart(id);
    router.refresh();
  };

  const deleteOneProductFromCart = () => {
    removeOneProductFromCart(id);
    router.refresh();
  };

  return (
    <div className='max-w-sm rounded-lg bg-slate-200 shadow dark:border-gray-100 dark:bg-gray-800'>
      {/* Product Image */}
      <div className='p-2'>
        <Image width={500} height={500} className='rounded' src={image} alt={name} />
      </div>

      {/* Title */}
      <div className='px-5 pb-5'>
        <Link href='#'>
          <h3 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </h3>
        </Link>
        <div className='mb-5 mt-2.5 flex items-center'>
          {/* Stars */}

          {Array(rating)
            .fill(0)
            .map((x, idx) => (
              <Star key={idx} />
            ))}

          {/* Rating Number */}
          <span className='ml-3 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800'>
            {rating.toFixed(2)}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className='flex items-center justify-between'>
          <span className='text-3xl font-bold text-gray-900 dark:text-white'>
            ${price}
          </span>

          <div className='flex'>
            <button className='mr-2 rounded-lg bg-red-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-800'>
              <IoCloseCircleOutline onClick={deleteOneProductFromCart} size={25} />
            </button>
            <button className='mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
              <IoAddCircleOutline onClick={onAddToCart} size={25} />
            </button>

            <button
              onClick={deleteProductFromCart}
              className='rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
