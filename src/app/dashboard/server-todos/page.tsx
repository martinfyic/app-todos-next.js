import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

export const metadata = {
  title: 'Listado de TODOs',
  description: 'Aqu se listaran todos los TODOs',
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

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
