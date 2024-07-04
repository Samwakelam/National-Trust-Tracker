'use server';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { getDatabaseConnection } from '../library/helpers';
import { ActionResponse } from '../library/types';
import MembershipsModel from '../library/models/Memberships.model';

const revalidate = () => {
    revalidatePath('/membership');
};

export const getMembership = async (
    groupName: string
): Promise<ActionResponse> => {
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

export const postMemberships = async (body: JSON): Promise<ActionResponse> => {
    try {
        await getDatabaseConnection();

        //@ts-ignore - unsure
        const data = await MembershipsModel.create(body);

        revalidate();

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
