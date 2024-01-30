import { WidgetItem } from '@/components';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className='flex min-h-screen flex-col items-center gap-14 p-24'>
      <h1 className='inline-block bg-gradient-to-tl from-sky-300 via-sky-400 to-sky-800 bg-clip-text text-center text-7xl font-semibold text-transparent'>
        Practica Next.js 14
      </h1>
      <h2 className='inline-block bg-gradient-to-tl from-sky-300 via-sky-400 to-sky-800 bg-clip-text text-center text-3xl font-semibold text-transparent'>
        Ejercicios de Next.js 14 para practicar el framework de React.js
      </h2>
    </main>
  );
}
