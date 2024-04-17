'use client';

import { useVisits } from '../../library/context/Visits.context';

// export const metadata: Metadata = {
//     title: 'National Trust Tracker',
// };

// export const generateMetadata = async () => {
//     return {
//         title: 'Visits',
//     };
// };

export const revalidate = 0;

export default function Visits(): JSX.Element {
    const { visits, isLoading, onDeleteVisit } = useVisits();
    console.log('visits: ', visits);

    return (
        <div style={{ height: '100%', overflowY: 'scroll' }}>
            {/* <pre>{JSON.stringify(visits, null, 2)}</pre> */}

            {visits.map((visit) => {
                return (
                    <div key={visit._id}>
                        <h2>{visit.place.name}</h2>
                        <button onClick={() => onDeleteVisit(visit._id)}>
                            {isLoading ? 'Deleting' : 'Delete'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
