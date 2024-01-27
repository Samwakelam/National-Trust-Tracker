import mongoose from 'mongoose';

export const getDatabaseConnection = async (): Promise<typeof mongoose> => {
    const url = process.env.MONGO_URI as string;

    return await mongoose.connect(url);
};
