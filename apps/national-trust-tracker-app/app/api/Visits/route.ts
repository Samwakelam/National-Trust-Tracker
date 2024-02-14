import { NextResponse } from 'next/server';

import { getDatabaseConnection } from '../../../library/helpers';

import VisitModel from '../../../library/models/Visits.model';

export const getAllVisits = async () => {
    try {
        await getDatabaseConnection();

        //@ts-ignore - unsure
        const data = await VisitModel.find({});

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log('Visits route GET error:', error);
        return NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
    }
};

export async function GET(request: Request) {
    return await getAllVisits();
}

export const postPlace = async (body: JSON) => {
    try {
        await getDatabaseConnection();

        // @ts-ignore - unsure
        const data = await VisitModel.create(body);

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log('Visits route Post error:', error);
        return NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
    }
};

export async function POST(request: Request) {
    const body = await request.json();

    return await postPlace(body);
}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
