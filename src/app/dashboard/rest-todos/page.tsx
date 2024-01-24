import prisma from '@/lib/prisma';
import { TodosGrid } from '@/todos';

export const metadata = {
  title: 'Listado de TODOs',
  description: 'Aqu se listaran todos los TODOs',
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <div>
      <TodosGrid todos={todos} />
    </div>
  );
}
