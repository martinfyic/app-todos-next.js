import { WidgetItem } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard',
  description: 'Aquí se listaran todos los productos seleccionados',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const userName = session.user?.name;
  const userEmail = session.user?.email;

  return (
    <main className='grid grid-cols-1 gap-6 text-slate-900 sm:grid-cols-2'>
      <WidgetItem title='Usuario conectado S-Side'>
        <h2 className='mt-8 text-center text-xl'>{userName}</h2>
        <span className='text-l text-center'>{userEmail}</span>
      </WidgetItem>
    </main>
  );
}
