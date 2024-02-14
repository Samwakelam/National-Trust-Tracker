import mongoose from 'mongoose';

import { Visit } from '../types/internal';

const { Schema } = mongoose;

const VisitsSchema = new Schema<Visit>({
    date: { type: String },
    tickets: [
        {
            name: { type: String },
            standardAmount: {
                currency: { type: String },
                amount: { type: Number },
            },
            qty: { type: Number },
        },
    ],
    place: {
        name: { type: String },
        placeId: { type: Number },
        location: {
            latitudeLongitude: {
                latitude: { type: Number },
                longitude: { type: Number },
            },
            postalAddress: {
                lines: [{ type: String }],
                town: { type: String },
                county: { type: String },
                country: { type: String },
                postcode: { type: String },
            },
            region: { type: String },
        },
        images: {
            PRIMARY: {
                description: { type: String },
                url: { type: String },
            },
        },
        featureCategories: [
            {
                name: { type: String },
                features: { type: Map, of: Boolean },
            },
        ],
        websiteUrl: { type: String },
    },
    people: [{ name: { type: String } }],
    assetsUsed: [
        {
            name: { type: String },
            description: { type: String },
            opensAt: { type: String },
            closesAt: { type: String },
        },
    ],
    images: [
        {
            access_mode: { type: String, lowercase: true },
            asset_id: { type: String, lowercase: true },
            bytes: { type: Number },
            created_at: { type: String, lowercase: true },
            etag: { type: String, lowercase: true },
            existing: { type: Boolean },
            folder: { type: String, lowercase: true },
            format: { type: String, lowercase: true },
            height: { type: Number },
            placeholder: { type: Boolean },
            public_id: { type: String, lowercase: true },
            resource_type: { type: String, lowercase: true },
            secure_url: { type: String, lowercase: true },
            signature: { type: String, lowercase: true },
            tags: [{ type: String, lowercase: true }],
            type: { type: String, lowercase: true },
            url: { type: String, lowercase: true },
            version: { type: Number },
            version_id: { type: String, lowercase: true },
            width: { type: Number },
        },
    ],
    facilitiesUsed: [
        {
            reference: { type: String },
            name: { type: String },
            description: { type: String },
            available: { type: Boolean },
            keyFacility: { type: Boolean },
        },
    ],
    travel: [{ type: String }],
    totalPrice: { type: Number },
});

export default mongoose.models.Visits ||
    mongoose.model('Visits', VisitsSchema, 'Visits');
