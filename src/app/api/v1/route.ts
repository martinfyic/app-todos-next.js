import { NextResponse, NextRequest } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: Request) {
	const todos = await prisma.todo.findMany();

	return NextResponse.json({
		date: `${new Date().toLocaleString()}`,
		url: request.url,
		method: request.method,
		data: todos,
	});
}

export async function POST(request: Request) {
	return NextResponse.json({
		message: 'Endpoint Post Ok',
	});
}
