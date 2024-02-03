'use client';

import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();

  const userName = session?.user?.name ?? 'No Name';
  const userEmail = session?.user?.email ?? 'No Email';

  return (
    <div>
      <h1 className='mb-10 bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-200 bg-clip-text text-center text-7xl font-semibold text-transparent'>
        User Profile
      </h1>
      <h2 className='mb-24 bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-200 bg-clip-text text-center text-3xl font-semibold text-transparent'>
        Client Side
      </h2>

      <div className='flex flex-col items-center justify-center'>
        <span>Usuario: {userName}</span>
        <span>Email: {userEmail}</span>
      </div>
    </div>
  );
}
