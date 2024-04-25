import { ReactNode } from 'react';

import { VisitsProvider } from '../library/context/Visits.context';
import { PlacesProvider } from '../library/context/Places.context';

import { getAllVisits } from '../actions/Visits.actions';
import { getAllPlaces } from '../actions/Places.actions';

export async function Providers({ children }: { children: ReactNode }) {
    const res = await Promise.all([await getAllVisits(), await getAllPlaces()]);

    return (
        <VisitsProvider initial={res[0].data}>
            <PlacesProvider initial={res[1].data}>{children}</PlacesProvider>
        </VisitsProvider>
    );
}
