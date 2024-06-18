'use client';

import { useVisits } from '../../library/context/Visits.context';
import { VisitCard } from './partials';

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
    const { visits, isLoading } = useVisits();

    return (
        <div
            data-label='page-container'
            className='flex flex-row gap-16 bg-slate-100 p-16 h-auto'
        >
            <div className='  flex flex-col bg-blue-100 gap-8 w-full'>
                {visits.map((visit) => {
                    return (
                        <VisitCard
                            visit={visit}
                            key={visit._id}
                        />
                    );
                })}
            </div>
        </div>
    );
}
