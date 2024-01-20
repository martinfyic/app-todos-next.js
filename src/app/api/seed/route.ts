import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request) {
	// Purgamos toda la base de datos para volver a generar el seed
	await prisma.todo.deleteMany();

	await prisma.todo.createMany({
		data: [
			{
				description: 'Descripción 1',
				complete: true,
			},
			{ description: 'Descripción 2' },
			{ description: 'Descripción 3' },
			{ description: 'Descripción 4' },
			{ description: 'Descripción 5' },
			{ description: 'Descripción 6' },
			{ description: 'Descripción 7' },
			{ description: 'Descripción 8' },
		],
	});

	return NextResponse.json({
		message: `Seed Ok! ${new Date().toLocaleString()}`,
	});
}
