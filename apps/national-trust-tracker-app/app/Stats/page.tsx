import { Metadata } from 'next';

import { StatisticsView } from './partials';
import { getMembership } from '../../actions/Membership.actions';
import Loading from '../loading';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Stats(): Promise<JSX.Element> {
    const membership = await getMembership('King');

    return membership.message === 'Success' ? (
        <StatisticsView membership={membership.data} />
    ) : (
        <Loading />
    );
}
