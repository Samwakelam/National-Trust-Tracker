import { Metadata } from 'next';
import { Spinner } from '../library/components';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Page(): Promise<JSX.Element> {
    return true ? <>Page</> : <Spinner isPageSpinner />;
}
