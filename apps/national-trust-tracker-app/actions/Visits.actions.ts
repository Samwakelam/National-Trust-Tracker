'use server';

import { getDatabaseConnection } from '../library/helpers';
import { Visit } from '../library/types/internal';
import VisitsModel from '../library/models/Visits.model';
import { NextResponse } from 'next/server';

export const getAllVisits = async () => {
    try {
        await getDatabaseConnection();

        //@ts-ignore
        const data = await VisitsModel.find({});

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('Visits route GET error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const postVisit = async (body: Omit<Visit, '_id'>) => {
    try {
        await getDatabaseConnection();

        //@ts-ignore
        const data = await VisitsModel.create(body);

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('Visits route Post error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const patchVisitById = async (visitId: string, body: JSON) => {
    try {
        await getDatabaseConnection();

        const data = await VisitsModel.updateOne({ _id: visitId }, body);

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
        return await res.json();
    } catch (error) {
        console.log('Visit[visitId] route PATCH error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
        return await res.json();
    }
};

export const deleteVisitById = async (visitId: string) => {
    try {
        await getDatabaseConnection();

        const data = await VisitsModel.deleteOne({ _id: visitId });

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
        return await res.json();
    } catch (error) {
        console.log('Visit[visitId] route DELETE error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
        return await res.json();
    }
};
