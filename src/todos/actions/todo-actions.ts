'use server';

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
