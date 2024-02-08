import { NextResponse, NextRequest } from 'next/server';

import prisma from '@/lib/prisma';
import { boolean, object, string } from 'yup';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('take') ?? '10');
  const offset = Number(searchParams.get('skip') ?? '0');

  if (isNaN(limit)) {
    return NextResponse.json(
      {
        message: 'Take must be a number',
      },
      { status: 400 }
    );
  }

  if (isNaN(offset)) {
    return NextResponse.json(
      {
        message: 'Skip must be a number',
      },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: limit,
    skip: offset,
  });

  return NextResponse.json(
    {
      date: `${new Date().toLocaleString()}`,
      url: request.url,
      method: request.method,
      data: todos,
    },
    { status: 200 }
  );
}

//* Validación de los objetos POST ----
const postSchema = object({
  description: string().required(),
  complete: boolean().optional().default(false),
});

export async function POST(request: Request) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json('Not authorized', { status: 401 });
  }

  try {
    const { complete, description } = await postSchema.validate(await request.json());
    const todo = await prisma.todo.create({
      data: { description, complete, userId: user.id },
    });

    return NextResponse.json(
      {
        date: `${new Date().toLocaleString()}`,
        url: request.url,
        method: request.method,
        data: todo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json('Not authorized', { status: 401 });
  }

  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        date: `${new Date().toLocaleString()}`,
        url: request.url,
        method: request.method,
        data: 'Delete success',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 204 });
  }
}
