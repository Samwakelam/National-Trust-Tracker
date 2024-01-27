import { NextResponse } from 'next/server';

import { getDatabaseConnection } from '../../../library/helpers';

import VisitModel from '../../../library/models/Visits.model';

export async function GET(request: Request) {
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
}

export async function POST(request: Request) {
    try {
        await getDatabaseConnection();

        const req = await request.json();

        // @ts-ignore - unsure
        const data = await VisitModel.create(req);

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
}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
