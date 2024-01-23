import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-around p-24'>
      <h1 className='inline-block bg-gradient-to-tl from-purple-300 via-purple-400 to-purple-800 bg-clip-text text-center text-7xl font-semibold text-transparent'>
        TODO list
      </h1>
      <Link
        href='/dashboard'
        className='rounded bg-gradient-to-r from-purple-500 to-purple-900 px-4 py-2'
      >
        <p className='text-xl text-white/85'>Dashboard</p>
      </Link>
    </main>
  );
}
