import { Link } from './link.type';

export type NameType = 'Adult' | 'Child' | 'Family' | '1 adult, 3 children';

export type AdmissionPrice = {
    name: NameType;
    standardAmount: {
        currency: 'GBP';
        amount: number;
    };
    giftAidAmount: {
        currency: 'GBP';
        amount: number;
    };
};

export type GroupAdmissionPrice = {
    name: 'Group';
    minimum: number;
    admissionPrices: AdmissionPrice[];
};

export type AdmissionCategory = {
    name: string;
    admissionPrices: AdmissionPrice[];
    groupAdmissionPrices: GroupAdmissionPrice[];
};

export type AdmissionPrices = {
    htmlNote: string;
    categories: AdmissionCategory[];
    links: Link[];
};
