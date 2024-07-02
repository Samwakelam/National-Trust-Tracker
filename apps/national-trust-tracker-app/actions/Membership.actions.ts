'use server';

import { NextResponse } from 'next/server';

import { getDatabaseConnection } from '../library/helpers';
import MembershipsModel from '../library/models/Memberships.model';

export const getMembership = async (groupName: string) => {
    await getDatabaseConnection();

    try {
        //@ts-ignore - unsure
        const data = await MembershipsModel.findOne({ groupName });

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('Membership By GroupName route GET error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const postMemberships = async (body: JSON) => {
    try {
        await getDatabaseConnection();

        //@ts-ignore - unsure
        const data = await MembershipsModel.create(body);

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('Memberships route POST error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};
