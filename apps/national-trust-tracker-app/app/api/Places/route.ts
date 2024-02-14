import { NextResponse } from 'next/server';

import { getDatabaseConnection } from '../../../library/helpers';

import PlacesModel from '../../../library/models/Places.model';

export const getAllPlaces = async () => {
    await getDatabaseConnection();

    try {
        //@ts-ignore - unsure
        const data = await PlacesModel.find({});

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log('Places route GET error:', error);
        return NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
    }
};

export async function GET(request: Request) {
    return await getAllPlaces();
}

export const postAllPlaces = async (body: JSON) => {
    try {
        await getDatabaseConnection();

        //@ts-ignore - unsure
        const data = await PlacesModel.create(body);

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log('Places route POST error:', error);
        return NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
    }
};

export async function POST(request: Request) {
    const body = await request.json();

    return await postAllPlaces(body);
}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
