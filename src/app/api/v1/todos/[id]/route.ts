import { NextResponse, NextRequest } from 'next/server';

import prisma from '@/lib/prisma';

interface Segments {
	params: {
		id: string;
	};
}

export async function GET(request: Request, { params }: Segments) {
	const data = await prisma.todo.findUnique({
		where: {
			id: params.id,
		},
	});

	if (!data) {
		return NextResponse.json(
			{
				message: `Todo with ID: ${params.id} not found`,
			},
			{ status: 404 }
		);
	}

	return NextResponse.json({
		data,
	});
}
