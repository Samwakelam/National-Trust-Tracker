'use server';

import { NextResponse } from 'next/server';

import { getDatabaseConnection } from '../library/helpers';
import NationalTrustDataModel from '../library/models/NationalTrustData.model';
import { ActionResponse } from '../library/types';
import { NationalTrustData } from '../library/types/internal';
import { revalidatePath } from 'next/cache';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const getNationalTrustData = async (): Promise<ActionResponse> => {
    await getDatabaseConnection();

    try {
        //@ts-ignore - unsure
        const data = await NationalTrustDataModel.find({});

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('National Trust Data route GET error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const putNationalTrustData = async (
    _id: string,
    update: UpdateQuery<NationalTrustData>
): Promise<ActionResponse> => {
    console.log('update: ', update);
    await getDatabaseConnection();

    try {
        const data = await NationalTrustDataModel.updateOne({ _id }, update);

        revalidatePath('/membership', 'page');

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('putNationalTrustData error:', error);

        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};
