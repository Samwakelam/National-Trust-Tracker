import { Metadata } from 'next';

import { MembershipView } from './partials/Membership.view';
import { getMembership } from '../../actions/Membership.actions';
import { getNationalTrustData } from '../../actions/NationalTrustData.actions';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Membership(): Promise<JSX.Element> {
    const data = await Promise.allSettled([
        await getMembership('King'),
        await getNationalTrustData(),
    ]);

    const membership =
        data[0].status === 'fulfilled' ? data[0].value.data : null;
    const nationalTrustData =
        data[1].status === 'fulfilled' ? data[1].value.data[0] : null;

    return membership ? (
        <MembershipView
            membership={membership}
            nationalTrustData={nationalTrustData}
        />
    ) : (
        <div>loading</div>
    );
}
