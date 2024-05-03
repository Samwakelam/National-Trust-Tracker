import { NextResponse } from 'next/server';
import { getAllVisits, postVisit } from '../../../actions/Visits.actions';

export const revalidate = 0;

export async function GET(request: Request) {
    const action = await getAllVisits();

    return NextResponse.json(action);
}

export async function POST(request: Request) {
    const body = await request.json();

    const action = await postVisit(body);

    return NextResponse.json(action);
}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
