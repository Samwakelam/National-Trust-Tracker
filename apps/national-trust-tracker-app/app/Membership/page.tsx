import { Metadata } from 'next';
import { MembershipView } from './partials/MembershipView.view';
import { getMembership } from '../../actions/Membership.actions';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Membership(): Promise<JSX.Element> {
    const membership = await getMembership('King');

    return <MembershipView membership={membership.data} />;
}
