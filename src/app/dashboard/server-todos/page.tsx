export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Server Actions | Listado de TODOs',
  description: 'Aquí se listaran todos los TODOs utilizando server actions',
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();

  if (!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <>
      <h1 className='mb-24 bg-gradient-to-r from-sky-600 via-cyan-400 to-purple-200 bg-clip-text text-center text-7xl font-semibold text-transparent'>
        Server Actions
      </h1>
      <div className='mx-5 mb-16 h-auto w-full px-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
