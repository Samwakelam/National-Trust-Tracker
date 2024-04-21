import { Metadata } from 'next';

import { StatisticsView } from './partials';
import { getMembership } from '../../actions/Membership.actions';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Stats(): Promise<JSX.Element> {
    const membership = await getMembership('King');

    return <StatisticsView membership={membership.data} />;
}
