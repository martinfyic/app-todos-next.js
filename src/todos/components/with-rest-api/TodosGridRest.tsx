'use client';

import { useRouter } from 'next/navigation';

import { Todo } from '@prisma/client';

import * as todosApi from '../../helpers';
import { TodoItem } from '../TodoItem';

interface Props {
  todos?: Todo[];
}

export const TodosGridRest = ({ todos = [] }: Props) => {
  const router = useRouter();

  const toggleTodo = async (id: string, complete: boolean) => {
    const updateTodo = await todosApi.updateTodo(id, complete);
    router.refresh();
    return updateTodo;
  };

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
