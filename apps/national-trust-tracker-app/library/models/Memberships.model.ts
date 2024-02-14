import mongoose from 'mongoose';

import { Membership } from '../types/internal';

const { Schema } = mongoose;

const MembershipsSchema = new Schema<Membership>({
    groupName: { type: String, required: true, dropDups: true },
    members: [
        {
            name: { type: String },
        },
    ],
    totalCost: { type: Number },
    startDate: { type: String },
    type: { type: String },
});

export default mongoose.models.Memberships ||
    mongoose.model('Memberships', MembershipsSchema, 'Memberships');
