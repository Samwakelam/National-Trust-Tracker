import { Metadata } from 'next';

import { PlacesView } from '../../library/views/Places.view';

import { Spinner } from '../../library/components';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

export default async function Places(): Promise<JSX.Element> {
    // const data = await getData();

    // if (data) {
    //     const { places, compiledPlaces, visits } = data;
    //     return (
    //         <>
    //             <PlacesView
    //                 places={places}
    //                 compiledPlaces={compiledPlaces.data}
    //                 visits={visits.data}
    //             />
    //         </>
    //     );
    // }

    return <Spinner isPageSpinner />;
}

// const getData = async () => {
//     const options = {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };

//     try {
//         const allResponse = await Promise.allSettled([
//             await fetch('https://v2-api.nationaltrust.org.uk/places', options),
//             await getAllPlaces(),
//             await getAllVisits(),
//         ]);

//         const allJson = await Promise.allSettled(
//             allResponse.map(async (res) => {
//                 if (res.status === 'fulfilled') {
//                     return await res.value.json();
//                 }
//             })
//         );

//         return {
//             places:
//                 allJson[0] && allJson[0].status === 'fulfilled'
//                     ? allJson[0].value
//                     : [],
//             compiledPlaces:
//                 allJson[1] && allJson[1].status === 'fulfilled'
//                     ? allJson[1].value
//                     : [],
//             visits:
//                 allJson[2] && allJson[2].status === 'fulfilled'
//                     ? allJson[2].value
//                     : [],
//         };
//     } catch (error) {
//         console.log('Places error: ', error);
//     }
// };
