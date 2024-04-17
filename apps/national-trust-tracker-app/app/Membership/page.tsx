import { Metadata } from 'next';

import { Spinner } from '../../library/components';
import { MembershipView } from '../../library/views/Membership/Membership.view';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Membership(): Promise<JSX.Element> {
    // const data = await getData();

    // if (data) {
    //     const { membership, visits } = data;
    //     return (
    //         <>
    //             <MembershipView
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
//             await getAllVisits(),
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
