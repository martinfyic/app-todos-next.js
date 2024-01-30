import { cookies } from 'next/headers';
import { TabBar } from '@/components';

export const metadata = {
  title: 'Cookies | Listado de TODOs',
  description: 'Aquí se listaran todos los TODOs utilizando REST',
};

export default function CookiesPage() {
  const cookieStore = cookies();
  const cookieTab = Number(cookieStore.get('selectedTab')?.value || '1');

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
      <div className='flex flex-col'>
        <h1 className='mb-24 bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-200 bg-clip-text text-7xl font-semibold text-transparent'>
          Tabs
        </h1>
        <TabBar currentTab={cookieTab} />
      </div>
    </div>
  );
}
