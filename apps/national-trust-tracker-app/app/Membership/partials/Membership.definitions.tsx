import { ChartData, ChartOptions } from 'chart.js';
import { Membership, Visit } from '../../../library/types/internal';

export type MembershipViewProps = {
    membership: Membership;
};

export type FormMembership = Membership;
export type MembershipChartType = 'ticket' | 'price';
export type MembershipData = any;
