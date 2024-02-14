import { NextResponse } from 'next/server';

import { getDatabaseConnection } from '../../../../library/helpers';

import PlacesModel from '../../../../library/models/Places.model';

type ParametersProps = { params: { placeId: string } };

export const getPlaceById = async (placeId: string) => {
    try {
        await getDatabaseConnection();
        //@ts-ignore - unsure
        const data = await PlacesModel.findOne({ placeId });

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log('Places[placeId] route GET error:', error);
        return NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
    }
};

export async function GET(request: Request, { params }: ParametersProps) {
    const placeId = params.placeId;
    return await getPlaceById(placeId);
}

export const putPlaceById = async (placeId: string, body: JSON) => {
    try {
        await getDatabaseConnection();

        //@ts-ignore - unsure
        const data = await PlacesModel.updateOne({ placeId }, body, {
            upsert: true,
        });

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log('Places[placeId] route PUT error:', error);
        return NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
    }
};

export async function PUT(request: Request, { params }: ParametersProps) {
    const placeId = params.placeId;
    const body = await request.json();

    return await putPlaceById(placeId, body);
}
