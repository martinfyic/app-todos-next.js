'use client';

import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();

  const userName = session?.user?.name ?? 'No Name';
  const userEmail = session?.user?.email ?? 'No Email';
  const userRole = session?.user?.roles;
  const userIsActive = session?.user?.isActive ?? '';
  const userUUID = session?.user?.id;

  return (
    <div>
      <h1 className='mb-10 bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-200 bg-clip-text text-center text-7xl font-semibold text-transparent'>
        User Profile
      </h1>
      <h2 className='mb-24 bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-200 bg-clip-text text-center text-3xl font-semibold text-transparent'>
        Client Side
      </h2>

      <div className='mx-auto flex  max-w-xl flex-col items-center justify-center rounded-lg border border-sky-400 bg-stone-900 p-5'>
        <p className='mb-4 text-xl'>
          <span className='bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
            ID de Usuario:
          </span>{' '}
          {userUUID}
        </p>
        <p className='mb-4 text-xl'>
          <span className='bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
            Nombre:
          </span>{' '}
          {userName}
        </p>
        <p className='mb-4 text-xl'>
          <span className='bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
            Email:
          </span>{' '}
          {userEmail}
        </p>
        <p className='mb-4 text-xl capitalize'>
          <span className='bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
            Roles:
          </span>{' '}
          {userRole?.join(', ')}
        </p>
        <p className='mb-4 text-xl capitalize'>
          <span className='bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
            Activo:
          </span>{' '}
          {userIsActive.toString()}
        </p>
      </div>
    </div>
  );
}
