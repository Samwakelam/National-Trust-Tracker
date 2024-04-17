import { NextResponse } from 'next/server';

import { getPlaceById, putPlaceById } from '../../../../actions/Places.actions';

type ParametersProps = { params: { placeId: string } };

export const revalidate = 0;

export async function GET(request: Request, { params }: ParametersProps) {
    const placeId = params.placeId;

    const action = await getPlaceById(placeId);

    return action;
}

export async function PUT(request: Request, { params }: ParametersProps) {
    const placeId = params.placeId;
    const body = await request.json();

    const action = await putPlaceById(placeId, body);

    return action;
}
