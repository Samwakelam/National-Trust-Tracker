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

type VisitsContextProps = {
    visits: VisitDB[];
    isLoading: boolean;
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

    const getVisit: VisitsContextProps['getVisit'] = async (visitId) => {};

    const getVisits: VisitsContextProps['getVisits'] = async () => {
        try {
            setIsLoading(true);
            const { status, message, data, error } = await getAllVisits();

            setVisits(data);
        } catch (error) {
            console.log('error getVisits: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onCreateVisit: VisitsContextProps['onCreateVisit'] = async () => {};

    const onDeleteVisit: VisitsContextProps['onDeleteVisit'] = async (
        visitId
    ) => {
        try {
            setIsLoading(true);
            const { status, message, data, error } =
                await deleteVisitById(visitId);

            if (data && data.deletedCount === 1) getVisits();
        } catch (error) {
            console.log('error getVisits: ', error);
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
