import { NextResponse } from 'next/server';

import { getDatabaseConnection } from '../../../library/helpers';
import MembershipsModel from '../../../library/models/Memberships.model';

export const postMemberships = async (body: JSON) => {
    try {
        await getDatabaseConnection();

        //@ts-ignore - unsure
        const data = await MembershipsModel.create(body);

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log('Memberships route POST error:', error);
        return NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
    }
};

export async function POST(request: Request) {
    const body = await request.json();

    return await postMemberships(body);
}
