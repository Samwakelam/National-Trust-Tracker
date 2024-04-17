'use server';

import { NextResponse } from 'next/server';
import { getDatabaseConnection } from '../library/helpers';
import PlacesModel from '../library/models/Places.model';

export const getAllPlaces = async () => {
    await getDatabaseConnection();

    try {
        //@ts-ignore - unsure
        const data = await PlacesModel.find({});

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('Places route GET error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const postPlace = async (body: JSON) => {
    try {
        await getDatabaseConnection();

        //@ts-ignore - unsure
        const data = await PlacesModel.create(body);

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('Places route POST error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const getPlaceById = async (placeId: string) => {
    try {
        await getDatabaseConnection();
        //@ts-ignore - unsure
        const data = await PlacesModel.findOne({ placeId });

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('Places[placeId] route GET error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};

export const putPlaceById = async (placeId: string, body: JSON) => {
    try {
        await getDatabaseConnection();

        //@ts-ignore - unsure
        const data = await PlacesModel.updateOne({ placeId }, body, {
            upsert: true,
        });

        const res = NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });

        return await res.json();
    } catch (error) {
        console.log('Places[placeId] route PUT error:', error);
        const res = NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });

        return await res.json();
    }
};
