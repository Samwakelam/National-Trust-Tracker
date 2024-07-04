import { NextResponse } from 'next/server';
import {
    deleteVisitById,
    patchVisitById,
} from '../../../../actions/Visits.actions';

type ParametersProps = { params: { visitId: string } };

export async function PATCH(request: Request, { params }: ParametersProps) {
    const visitId = params.visitId;
    const body = await request.json();

    const action = await patchVisitById(visitId, body);

    return NextResponse.json(action);
}

export async function DELETE(request: Request, { params }: ParametersProps) {
    const visitId = params.visitId;

    const action = await deleteVisitById(visitId);

    return NextResponse.json(action);
}
