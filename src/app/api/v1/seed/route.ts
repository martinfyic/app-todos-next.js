import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  // Purgamos toda la base de datos para volver a generar el seed
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const userSeed = await prisma.user.create({
    data: {
      name: 'User Seed',
      email: 'userSeed@example.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client', 'super-admin'],
      todo: {
        create: [
          {
            description:
              'Occaecat consequat est ullamco cupidatat dolore non labore est aute voluptate exercitation.',
            complete: true,
          },
          {
            description:
              'Ut mollit et est sint enim cillum dolor eiusmod excepteur cillum occaecat nostrud duis ea.',
          },
          {
            description:
              'Minim sunt excepteur minim duis tempor ea quis enim consequat nostrud veniam minim ad.',
          },
          {
            description:
              'Laboris consectetur cillum sint laboris voluptate ea cupidatat eiusmod labore.',
          },
          {
            description:
              'Adipisicing cillum tempor adipisicing ad sunt eu voluptate officia.',
          },
          { description: 'Dolor adipisicing est culpa adipisicing.' },
          {
            description:
              'Reprehenderit enim quis sint sunt ea officia exercitation est deserunt fugiat duis dolore enim.',
          },
          {
            description: 'Mollit ipsum excepteur proident sit cupidatat occaecat aliqua.',
          },
        ],
      },
    },
  });

  return NextResponse.json({
    data: new Date().toLocaleString(),
    message: 'Seed executed OK',
  });
}
