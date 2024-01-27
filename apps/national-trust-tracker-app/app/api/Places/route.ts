import { NextResponse } from 'next/server';

import { getDatabaseConnection } from '../../../library/helpers';

import PlacesModel from '../../../library/models/Places.model';

export async function GET(request: Request) {
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
}

export async function POST(request: Request) {
    try {
        await getDatabaseConnection();

        const req = await request.json();

        //@ts-ignore - unsure
        const data = await PlacesModel.create(req);

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
}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
