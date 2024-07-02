'use server';

import mongoose from 'mongoose';

export const getDatabaseConnection = async (): Promise<typeof mongoose> => {
    const url = process.env.MONGODB_URI as string;
    console.log('url: ', url);

    return await mongoose.connect(url);
};
