import { Metadata } from 'next';

import { Spinner } from '../../library/components';
import { VisitsView } from '../../library/views/Visits.view';
import { getAllVisits } from '../api/Visits/route';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Visits(): Promise<JSX.Element> {
    const data = await getData();

    return data ? <VisitsView visits={data.data} /> : <Spinner isPageSpinner />;
}

const getData = async () => {
    try {
        const res = await getAllVisits();

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return await res.json();
    } catch (error) {
        console.log('error: ', error);
    }
};
