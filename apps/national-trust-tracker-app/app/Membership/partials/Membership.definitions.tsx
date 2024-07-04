import { Membership, NationalTrustData } from '../../../library/types/internal';

export type MembershipViewProps = {
    membership: Membership;
    nationalTrustData: NationalTrustData | null;
};

export type FormMembership = Membership;
export type MembershipChartType = 'ticket' | 'price';
export type MembershipData = any;
