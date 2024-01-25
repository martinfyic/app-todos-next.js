import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

export const metadata = {
  title: 'Listado de TODOs',
  description: 'Aqu se listaran todos los TODOs',
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <>
      <div className='mx-5 mb-16 h-auto w-full px-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
