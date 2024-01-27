import { Metadata } from 'next';

import { Spinner } from '../../library/components';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Visits(): Promise<JSX.Element> {
    const data = await getData();

    return data ? <>Visits</> : <Spinner isPageSpinner />;
}

const getData = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await fetch(
            'https://v2-api.nationaltrust.org.uk/places',
            options
        );

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return await res.json();
    } catch (error) {
        console.log('error: ', error);
    }
};
