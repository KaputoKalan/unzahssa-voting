import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	try {
		const positions = await db.position.findMany()

		return NextResponse.json(positions)
	} catch (error) {
		console.log('[GET_POSITIONS_ERROR]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const { label, value } = await req.json()

		const position = await db.position.create({
			data: { label, value },
		})

		return NextResponse.json(position)
	} catch (error) {
		console.log('[CREATE_POSITION_ERROR]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
