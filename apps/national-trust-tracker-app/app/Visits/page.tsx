import { Metadata } from 'next';

import { VisitsView } from './partials';

export const metadata: Metadata = {
    title: 'National Trust Tracker',
};

// export const generateMetadata = async () => {
//     return {
//         title: 'Visits',
//     };
// };

export const revalidate = 0;

export default function Visits(): JSX.Element {
    return <VisitsView />;
}
