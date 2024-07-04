'use client';

import {
    createContext,
    useContext,
    ReactElement,
    useState,
    ReactNode,
    useEffect,
} from 'react';

import {
    deleteVisitById,
    getAllVisits,
    postVisit,
} from '../../actions/Visits.actions';

import { Visit, VisitDB } from '../types/internal';
import { ActionResponse } from '../types';

import {
    ReduceMapProps,
    getReduced,
    getReducedByMonth,
    getReducedByYear,
    getReducedSpecificity,
} from './Visits.helpers';

// MARK: Type

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
    onCreateVisit: (visit: Visit) => Promise<ActionResponse>;
    onDeleteVisit: (visitId: string) => Promise<ActionResponse>;
    onUpdateVisit: (visitId: string) => Promise<ActionResponse>;
};

type VisitsProviderProps = {
    children: ReactElement | ReactNode;
    initial: VisitDB[];
};

// MARK: Initial State

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
    onCreateVisit: function (visit: Visit): Promise<ActionResponse> {
        throw new Error('Function not implemented.');
    },
    onDeleteVisit: function (visitId: string): Promise<ActionResponse> {
        throw new Error('Function not implemented.');
    },
    onUpdateVisit: function (visitId: string): Promise<ActionResponse> {
        throw new Error('Function not implemented.');
    },
};

// MARK: Context

const VisitsContext = createContext<VisitsContextProps>(initialState);

// MARK: Provider

export const VisitsProvider = ({ initial, children }: VisitsProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visits, setVisits] = useState<VisitsContextProps['visits']>(initial);

    useEffect(() => {
        console.log('visits:', visits);
    }, [visits]);

    // MARK: Handlers

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

    // MARK: Action Functions

    const onCreateVisit: VisitsContextProps['onCreateVisit'] = async (
        visit
    ) => {
        try {
            setIsLoading(true);

            const postBody = JSON.parse(JSON.stringify(visit));
            const res = await postVisit(postBody);

            if (res.message === 'Error' && res.error)
                throw new Error(res.error);

            if (res.message === 'Success') onReadVisits();

            return res;
        } catch (error) {
            console.log('error onCreateVisit: ', error);
            return { status: 500, message: 'Error', error };
        } finally {
            setIsLoading(false);
        }
    };

    const onDeleteVisit: VisitsContextProps['onDeleteVisit'] = async (
        visitId
    ) => {
        try {
            setIsLoading(true);
            const res = await deleteVisitById(visitId);

            if (res.message === 'Error' && res.error)
                throw new Error(res.error);

            if (
                res.message === 'Success' &&
                res.data &&
                res.data.deletedCount === 1
            )
                onReadVisits();

            return res;
        } catch (error) {
            console.log('error onReadVisits: ', error);
            return { status: 500, message: 'Error', error };
        } finally {
            setIsLoading(false);
        }
    };

    const onReadVisits: () => void = async () => {
        try {
            setIsLoading(true);
            const res = await getAllVisits();

            if (res.message === 'Error' && res.error)
                throw new Error(res.error);

            if (res.message === 'Success' && res.data) setVisits(res.data);

            return res;
        } catch (error) {
            console.log('error onReadVisits: ', error);
            return { status: 500, message: 'Error', error };
        } finally {
            setIsLoading(false);
        }
    };

    const onUpdateVisit: VisitsContextProps['onUpdateVisit'] = async (
        visitId
    ) => {
        return { status: 501, message: 'Error', error: 'not implemented' };
    };

    // MARK: Return

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

// MARK: Hook

export const useVisits = () => {
    return useContext(VisitsContext);
};
