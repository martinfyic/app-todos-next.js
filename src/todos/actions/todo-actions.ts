'use server';

// TODO => Como mejora podríamos enviar un parámetro adicional a los server action que le indique el path en que estamos para utilizarlo en el revalidate.

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `TODO con id ${id} no encontrado`;
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath('/dashboard/server-todos');

  return updateTodo;
};

export const addTodo = async (
  description: string,
  userId: string
): Promise<Todo | { message: string }> => {
  try {
    const todo = await prisma.todo.create({ data: { description, userId } });
    revalidatePath('/dashboard/server-todos');
    return todo;
  } catch (error) {
    return {
      message: 'Error creando TODO',
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });
  revalidatePath('/dashboard/server-todos');
};
