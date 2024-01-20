import { NextResponse, NextRequest } from 'next/server';

import prisma from '@/lib/prisma';

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

  return NextResponse.json({
    date: `${new Date().toLocaleString()}`,
    url: request.url,
    method: request.method,
    data: todos,
  });
}

export async function POST(request: Request) {
  const { description, complete } = await request.json();

  const todo = await prisma.todo.create({ data: { description, complete } });

  if (!todo) {
    return;
  }

  return NextResponse.json({ post: todo }, { status: 201 });
}
