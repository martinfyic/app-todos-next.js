'use client';

import { useRouter } from 'next/navigation';

import { Todo } from '@prisma/client';

import { toggleTodo } from '../../actions/todo-actions'; // [server actions]: llamo directamente la función de mis actions
import { TodoItem } from '../TodoItem';

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
