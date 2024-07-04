import mongoose from 'mongoose';

import { NationalTrustData } from '../types/internal';

const { Schema } = mongoose;

const NationalTrustDataSchema = new Schema<NationalTrustData>({
    annualMembership: { type: Map, of: Number },
});

export default mongoose.models.NationalTrustData ||
    mongoose.model(
        'NationalTrustData',
        NationalTrustDataSchema,
        'NationalTrustData'
    );
