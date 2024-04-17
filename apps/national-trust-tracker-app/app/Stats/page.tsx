import { Metadata } from 'next';

import { Spinner } from '../../library/components';

import { StatisticsView } from '../../library/views/Statistics/Statistics.view';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Stats(): Promise<JSX.Element> {
    // const data = await getData();

    // if (data) {
    //     const { membership, visits } = data;
    //     return (
    //         <>
    //             <StatisticsView
    //                 visits={visits.data}
    //                 membership={membership.data}
    //             />
    //         </>
    //     );
    // }

    return <Spinner isPageSpinner />;
}

// const getData = async () => {
//     try {
//         const allResponse = await Promise.allSettled([
//             await await getAllVisits(),
//             await getMembership('King'),
//         ]);

//         const allJson = await Promise.allSettled(
//             allResponse.map(async (res) => {
//                 if (res.status === 'fulfilled') {
//                     return await res.value.json();
//                 }
//             })
//         );

//         return {
//             visits:
//                 allJson[0] && allJson[0].status === 'fulfilled'
//                     ? allJson[0].value
//                     : [],
//             membership:
//                 allJson[1] && allJson[1].status === 'fulfilled'
//                     ? allJson[1].value
//                     : [],
//         };
//     } catch (error) {
//         console.log('error: ', error);
//     }
// };
