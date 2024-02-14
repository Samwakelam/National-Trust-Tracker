import mongoose from 'mongoose';
import { CompiledPlace } from '../types/internal';
const { Schema } = mongoose;

const PlacesSchema = new Schema<CompiledPlace>({
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
    featureCategories: [
        {
            name: { type: String },
            features: { type: Map, of: Boolean },
        },
    ],
    websiteUrl: { type: String },
    images: {
        PRIMARY: {
            description: { type: String },
            url: { type: String },
        },
    },
    accessTags: {
        tags: [
            {
                reference: { type: String },
                name: { type: String },
                description: { type: String },
            },
        ],
        resourceType: { type: String },
        links: [
            {
                href: { type: String },
                lastModified: { type: String },
                rel: { type: String },
            },
        ],
    },
    directions: {
        directions: {
            type: Map,
            of: {
                htmlDescription: { type: String },
                parking: { type: String },
                satnav: { type: String },
            },
        },
        links: [
            {
                href: { type: String },
                lastModified: { type: String },
                rel: { type: String },
            },
        ],
    },
    facilities: {
        facilities: [
            {
                reference: { type: String },
                name: { type: String },
                description: { type: String },
                available: { type: Boolean },
                keyFacility: { type: Boolean },
            },
        ],
        resourceType: { type: String },
        links: [
            {
                href: { type: String },
                lastModified: { type: String },
                rel: { type: String },
            },
        ],
    },
    opening: {
        openingTimesNote: { type: String },
        days: {
            type: Map,
            of: {
                status: { type: String },
                assets: [
                    {
                        name: { type: String },
                        description: { type: String },
                        opensAt: { type: String },
                        closesAt: { type: String },
                    },
                ],
            },
        },
        links: [
            {
                href: { type: String },
                lastModified: { type: String },
                rel: { type: String },
            },
        ],
    },
});

export default mongoose.models.Places ||
    mongoose.model('Places', PlacesSchema, 'Places');
