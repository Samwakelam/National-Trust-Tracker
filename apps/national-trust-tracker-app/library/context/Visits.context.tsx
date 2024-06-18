'use client';

import {
    createContext,
    useContext,
    ReactElement,
    useState,
    ReactNode,
} from 'react';

import { VisitDB } from '../types/internal';

import { deleteVisitById, getAllVisits } from '../../actions/Visits.actions';
import {
    ReduceMapProps,
    getReduced,
    getReducedByMonth,
    getReducedByYear,
    getReducedSpecificity,
} from './Visits.helpers';

type Filter = {
    specificity?: 'month' | 'year' | 'all';
    date?: string;
};

type VisitsContextProps = {
    visits: VisitDB[];
    isLoading: boolean;
    getStatistics: (
        filter?: Filter
    ) => ReduceMapProps | Record<string, ReduceMapProps>;
    getVisit: (visitId: string) => void;
    getVisits: () => void;
    onCreateVisit: () => void;
    onDeleteVisit: (visitId: string) => void;
    onUpdateVisit: (visitId: string) => void;
};

type VisitsProviderProps = {
    children: ReactElement | ReactNode;
    initial: VisitDB[];
};

const initialState: VisitsContextProps = {
    visits: [],
    isLoading: false,
    getStatistics: function (filter?: Filter): ReduceMapProps {
        throw new Error('Function not implemented.');
    },
    getVisit: function (visitId: string): void {
        throw new Error('Function not implemented.');
    },
    getVisits: function (): void {
        throw new Error('Function not implemented.');
    },
    onCreateVisit: function (): void {
        throw new Error('Function not implemented.');
    },
    onDeleteVisit: function (visitId: string): void {
        throw new Error('Function not implemented.');
    },
    onUpdateVisit: function (visitId: string): void {
        throw new Error('Function not implemented.');
    },
};

const VisitsContext = createContext<VisitsContextProps>(initialState);

export const VisitsProvider = ({ initial, children }: VisitsProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visits, setVisits] = useState<VisitsContextProps['visits']>(initial);

    const getStatistics: VisitsContextProps['getStatistics'] = (
        filter = {}
    ) => {
        const { specificity = 'all', date } = filter;

        const _visits = date
            ? visits.filter((visit) => visit.date.includes(date))
            : visits;

        switch (specificity) {
            case 'month':
                return getReducedSpecificity(getReducedByMonth(_visits));
            case 'year':
                return getReducedSpecificity(getReducedByYear(_visits));
            default:
                return getReduced(_visits);
        }
    };

    const getVisit: VisitsContextProps['getVisit'] = (visitId) => {};

    const getVisits: VisitsContextProps['getVisits'] = () => {};

    const onCreateVisit: VisitsContextProps['onCreateVisit'] = async () => {};

    const onDeleteVisit: VisitsContextProps['onDeleteVisit'] = async (
        visitId
    ) => {
        try {
            setIsLoading(true);
            const { status, message, data, error } =
                await deleteVisitById(visitId);

            if (data && data.deletedCount === 1) onReadVisits();
        } catch (error) {
            console.log('error onReadVisits: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onReadVisits: () => void = async () => {
        try {
            setIsLoading(true);
            const { status, message, data, error } = await getAllVisits();

            setVisits(data);
        } catch (error) {
            console.log('error onReadVisits: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onUpdateVisit: VisitsContextProps['onUpdateVisit'] = async (
        visitId
    ) => {};

    return (
        <VisitsContext.Provider
            value={{
                isLoading,
                visits,
                getVisit,
                getVisits,
                getStatistics,
                onCreateVisit,
                onDeleteVisit,
                onUpdateVisit,
            }}
        >
            {children}
        </VisitsContext.Provider>
    );
};

export const useVisits = () => {
    return useContext(VisitsContext);
};
