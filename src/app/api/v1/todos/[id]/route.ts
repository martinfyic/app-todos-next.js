import { NextResponse, NextRequest } from 'next/server';

import { boolean, object, string } from 'yup';

import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

interface Segments {
  params: {
    id: string;
  };
}

//* Helper Get todo ----
const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();

  if (!user) return null;

  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (todo?.userId !== user.id) return null;

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo with ID: ${params.id} not found`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    date: `${new Date().toLocaleString()}`,
    url: request.url,
    method: request.method,
    data: todo,
  });
}

//* Validación de los objetos PUT ----
const putSchema = object({
  description: string().optional(),
  complete: boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json('Not authorized', { status: 401 });
  }
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo with ID: ${params.id} not found`,
      },
      { status: 404 }
    );
  }

  try {
    const { complete, description } = await putSchema.validate(await request.json());
    const updateTodo = await prisma.todo.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data: {
        complete,
        description,
      },
    });

    return NextResponse.json(
      {
        date: `${new Date().toLocaleString()}`,
        url: request.url,
        method: request.method,
        data: updateTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
