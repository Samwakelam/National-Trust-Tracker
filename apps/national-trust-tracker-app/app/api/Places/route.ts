import { NextResponse } from 'next/server';

import { getAllPlaces, postPlace } from '../../../actions/Places.actions';

export const revalidate = 0;

export async function GET(request: Request) {
    const action = await getAllPlaces();

    return action;
}

export async function POST(request: Request) {
    const body = await request.json();

    const action = await postPlace(body);

    return action;
}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
