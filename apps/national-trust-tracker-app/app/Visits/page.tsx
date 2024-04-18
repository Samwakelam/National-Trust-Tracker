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
    console.log('visits: ', visits);

    return (
        <div
            data-label='page-container'
            className='flex flex-rox gap-16 bg-pink-100 p-16 h-screen'
        >
            {/* <pre>{JSON.stringify(visits, null, 2)}</pre> */}
            {/* <div
                data-label='grid'
                className='grid grid-cols-3 gap-16 w-full'
            > */}
            <div className=' bg-blue-100 p-8 flex flex-col gap-4 w-full'>
                {visits.map((visit) => {
                    return (
                        <VisitCard
                            visit={visit}
                            key={visit._id}
                        />
                    );
                })}
            </div>
            {/* <div className='col-span-1 bg-blue-100 p-8 flex flex-row'></div>
            </div> */}
        </div>
    );
}
