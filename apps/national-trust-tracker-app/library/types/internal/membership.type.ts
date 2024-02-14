import { Person } from './visit.type';

export const membershipType = [
    'lifetime-joint',
    'lifetime-family',
    'lifetime-individual',
    'joint',
    'family',
    'individual',
];

export type MembershipType = (typeof membershipType)[number];

export type Membership = {
    groupName: string;
    members: Person[];
    totalCost: number;
    startDate: string;
    type: MembershipType;
};
