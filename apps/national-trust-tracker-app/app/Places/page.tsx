import { Metadata } from 'next';
import { useCallback } from 'react';

import { Places as PlacesType } from '../../library/types/national-trust';

import { PlacesView } from './partials';

export const metadata: Metadata = {
    title: 'National Trust Places',
};

export default async function Places() {
    const getData = useCallback(async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await fetch(
            'https://v2-api.nationaltrust.org.uk/places',
            options
        );

        return await res.json();
    }, []);

    const data: PlacesType = await getData();

    const places = data.placeSummaries.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }

        if (b.name > a.name) {
            return -1;
        }

        return 0;
    });

    return <PlacesView places={places} />;
}
