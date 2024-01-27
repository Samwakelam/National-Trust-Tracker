import { Metadata } from 'next';

import { PlacesView } from '../../library/views/Places.view';

import { Spinner } from '../../library/components';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Places(): Promise<JSX.Element> {
    const data = await getData();

    return true ? <PlacesView places={data} /> : <Spinner isPageSpinner />;
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
        console.log('Places error: ', error);
    }
};
