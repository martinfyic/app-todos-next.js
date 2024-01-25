import { Todo } from '@prisma/client';

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const URL = `/api/v1/todos/${id}`;
  const body = { complete };

  const todoUpdate = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return todoUpdate;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const URL = '/api/v1/todos';
  const body = { description };

  const createTodo = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return createTodo;
};

export const deleteCompletedTodos = async (): Promise<boolean> => {
  const URL = '/api/v1/todos';

  await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return true;
};
