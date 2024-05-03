'use client';

import {
    createContext,
    useContext,
    ReactElement,
    useState,
    ReactNode,
} from 'react';

import { getAllPlaces } from '../../actions/Places.actions';
import { Place } from '../types/national-trust';

// MARK: Types

type PlacesContextProps = {
    isLoading: boolean;
    places: Place[];
    getPlace: (placeId: string) => void;
    getPlaces: () => void;
    onCreatePlace: (place: Place) => void;
    onDeletePlace: (placeId: string) => void;
    onUpdatePlace: (placeId: string) => void;
};

type PlacesProviderProps = {
    children: ReactElement | ReactNode;
    initial: Place[];
};

// MARK: Initial State

const initialState: PlacesContextProps = {
    isLoading: false,
    places: [],
    getPlace: function (placeId: string): void {
        throw new Error('Function not implemented.');
    },
    getPlaces: function (): void {
        throw new Error('Function not implemented.');
    },
    onCreatePlace: function (place: Place): void {
        throw new Error('Function not implemented.');
    },
    onDeletePlace: function (placeId: string): void {
        throw new Error('Function not implemented.');
    },
    onUpdatePlace: function (placeId: string): void {
        throw new Error('Function not implemented.');
    },
};

// MARK: Context

const PlacesContext = createContext<PlacesContextProps>(initialState);

// MARK: Provider

export const PlacesProvider = ({ initial, children }: PlacesProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [places, setPlaces] = useState<PlacesContextProps['places']>(initial);

    // MARK: Handlers

    const getPlace: PlacesContextProps['getPlace'] = async (placeId) => {};

    const getPlaces: PlacesContextProps['getPlaces'] = async () => {
        const { status, message, data, error } = await getAllPlaces();

        setPlaces(data);
    };

    // MARK: Event Functions

    const onCreatePlace: PlacesContextProps['onCreatePlace'] = async (
        place
    ) => {};

    const onDeletePlace: PlacesContextProps['onDeletePlace'] = async (
        placeId
    ) => {};

    const onUpdatePlace: PlacesContextProps['onUpdatePlace'] = async (
        placeId
    ) => {};

    // MARK: Return

    return (
        <PlacesContext.Provider
            value={{
                isLoading,
                places,
                getPlace,
                getPlaces,
                onCreatePlace,
                onDeletePlace,
                onUpdatePlace,
            }}
        >
            {children}
        </PlacesContext.Provider>
    );
};

// MARK: UsePlaces

export const usePlaces = () => useContext(PlacesContext);
