import { Metadata } from 'next';

import { Spinner } from '../../../../library/components';
import { PlaceView } from '../../../../library/views/Place/Place.view';
import {
    PlaceSummary,
    Places,
} from '../../../../library/types/national-trust/places.type';
import { Link } from '../../../../library/types/national-trust/link.type';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

type PlaceProps = {
    params: Pick<PlaceSummary, 'name' | 'placeId'>;
};

const Place = async ({ params }: PlaceProps): Promise<JSX.Element> => {
    const data = await getData({
        placeId: params.placeId,
    });

    return data ? <PlaceView {...data} /> : <Spinner isPageSpinner />;
};

export default Place;

export const generateStaticParams = async () => {
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

        const places: Places = await res.json();
        return places.placeSummaries.map((place: PlaceSummary) => {
            return JSON.stringify(place);
        });
    } catch (error) {
        console.log('Place generateStaticParams error: ', error);
    }
};

const getData = async ({ placeId }: { placeId: number }) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await fetch(
            `https://v2-api.nationaltrust.org.uk/places/${placeId}`,
            options
        );

        if (!res.ok) {
            throw Error('Failed to fetch Place data');
        }

        const place = await res.json();

        const all = await Promise.all(
            place.links.map(async (link: Link) => {
                const res = await fetch(link.href, options);
                if (!res.body) return [link.rel, {}];
                return [link.rel, await res.json()];
            })
        );

        const info: Record<string, any> = {};
        all.forEach((item) => {
            info[item[0]] = item[1];
        });

        return { place, ...info };
    } catch (error) {
        console.log('Place Error: ', error);
    }
};
