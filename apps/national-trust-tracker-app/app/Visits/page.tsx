'use client';

import { useRouter } from 'next/navigation';

import { Button, Card } from '../../library/components';
import { useVisits } from '../../library/context/Visits.context';
import {
    getAmountInPounds,
    getCase,
    resolveCurrency,
} from '../../library/helpers';

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
    const router = useRouter();
    const { visits, isLoading, onDeleteVisit } = useVisits();
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
                        <Card
                            key={visit._id}
                            heading={new Date(visit.date).toDateString()}
                        >
                            <div className='flex flex-row gap-8'>
                                <p>{visit.place.location.region}</p>
                            </div>
                            <div className='flex flex-row gap-8'>
                                <p>{visit.place.name}</p>
                                <p>assets</p>
                            </div>

                            <p>
                                <span>Total: </span>
                                <span>
                                    {resolveCurrency('GBP')}
                                    {getAmountInPounds(visit.totalPrice)}
                                </span>
                            </p>

                            <div className='flex flex-col'>
                                <p>{visit.people.length} visitors</p>
                            </div>
                            <Button onClick={() => onDeleteVisit(visit._id)}>
                                Delete Visit
                            </Button>
                            <Button
                                onClick={() =>
                                    router.push(
                                        `/Places/${getCase(visit.place.name, 'pascal')}/${visit.place.placeId}`
                                    )
                                }
                            >
                                Visit Property Page
                            </Button>
                        </Card>
                    );
                })}
            </div>
            {/* <div className='col-span-1 bg-blue-100 p-8 flex flex-row'></div>
            </div> */}
        </div>
    );
}
