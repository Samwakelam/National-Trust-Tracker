import {
    getAllVisitIds,
    getAllVisits,
    getVisitById,
} from '../../../actions/Visits.actions';
import { VisitDB } from '../../../library/types/internal';

import { VisitView } from './partials/Visit.view';

// MARK: Types

type VisitProps = {
    params: { visitId: VisitDB['_id'] };
};

// MARK: View

export default async function Visit({ params }: VisitProps) {
    const data = await getData(params.visitId);

    return <VisitView visit={data} />;
}

const getData = async (visitId: string) => {
    try {
        const res = await getVisitById(visitId);

        if (res.message === 'Error') {
            throw new Error(res.error);
        }

        return res.data;
    } catch (error) {
        console.log('Visit getData error: ', error);
        return [];
    }
};

export const generateStaticParams = async () => {
    try {
        const res = await getAllVisitIds();

        if (res.message === 'Success') {
            return res.data.map((item: { _id: string }) => ({
                visitId: item._id,
            }));
        }

        return [];
    } catch (error) {
        console.log('Visit generateStaticParams error: ', error);
        return [];
    }
};
