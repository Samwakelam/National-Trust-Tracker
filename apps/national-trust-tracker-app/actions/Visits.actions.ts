'use server';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { getDatabaseConnection } from '../library/helpers';
import { Visit, VisitDB } from '../library/types/internal';
import VisitsModel from '../library/models/Visits.model';
import { ActionResponse } from '../library/types';

const revalidate = () => {
    revalidatePath('/', 'layout');
};

export const getAllVisits = async (): Promise<ActionResponse> => {
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
        console.log('getAllVisits error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const getVisitById = async (
    _id: VisitDB['_id']
): Promise<ActionResponse> => {
    try {
        await getDatabaseConnection();

        //@ts-ignore
        const data = await VisitsModel.findOne({ _id });

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('getVisitById error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const postVisit = async (
    body: Omit<Visit, '_id'>
): Promise<ActionResponse> => {
    try {
        await getDatabaseConnection();

        //@ts-ignore
        const data = await VisitsModel.create(body);

        revalidate();

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

export const patchVisitById = async (
    visitId: string,
    body: JSON
): Promise<ActionResponse> => {
    try {
        await getDatabaseConnection();

        const data = await VisitsModel.updateOne({ _id: visitId }, body);

        revalidate();

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

export const putVisitById = async (
    visitId: string,
    update: VisitDB
): Promise<ActionResponse> => {
    try {
        await getDatabaseConnection();

        const data = await VisitsModel.updateOne({ _id: visitId }, update);

        revalidate();

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
        return await res.json();
    } catch (error) {
        console.log('putVisitById error:', error);

        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
        return await res.json();
    }
};

export const deleteVisitById = async (
    visitId: string
): Promise<ActionResponse> => {
    try {
        await getDatabaseConnection();

        const data = await VisitsModel.deleteOne({ _id: visitId });

        revalidate();

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
