'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

import { CiLogout } from 'react-icons/ci';
import { IoShieldOutline, IoTrailSignOutline } from 'react-icons/io5';

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <button className='group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600'>
        <IoShieldOutline />
        <span className='group-hover:text-gray-700'>Espere...</span>
      </button>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <button
        className='group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600'
        onClick={() => signIn()}
      >
        <IoTrailSignOutline />
        <span className='group-hover:text-gray-700'>Sign In</span>
      </button>
    );
  }

  return (
    <button
      className='group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600'
      onClick={() => signOut()}
    >
      <CiLogout />
      <span className='group-hover:text-gray-700'>Logout</span>
    </button>
  );
};
