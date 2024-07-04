import { NextResponse } from 'next/server';

import { getPlaceById, putPlaceById } from '../../../../actions/Places.actions';

type ParametersProps = { params: { placeId: string } };

export async function GET(request: Request, { params }: ParametersProps) {
    const placeId = params.placeId;

    const action = await getPlaceById(placeId);

    return NextResponse.json(action);
}

export async function PUT(request: Request, { params }: ParametersProps) {
    const placeId = params.placeId;
    const body = await request.json();

    const action = await putPlaceById(placeId, body);

    return NextResponse.json(action);
}
