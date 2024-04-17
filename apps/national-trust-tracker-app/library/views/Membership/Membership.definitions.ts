import { ChartData, ChartOptions } from 'chart.js';

import { Membership, Visit } from '../../types/internal';

export type MembershipViewProps = {
    visits: Visit[];
    membership: Membership;
};

export type FormMembership = Membership;
export type MembershipChartType = 'ticket' | 'price';
export type MembershipData = any;
