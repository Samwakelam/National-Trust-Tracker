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

const PlacesContext = createContext<PlacesContextProps>(initialState);

export const PlacesProvider = ({ initial, children }: PlacesProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [places, setPlaces] = useState<PlacesContextProps['places']>(initial);

    const getPlace: PlacesContextProps['getPlace'] = async (placeId) => {};

    const getPlaces: PlacesContextProps['getPlaces'] = async () => {
        const { status, message, data, error } = await getAllPlaces();

        setPlaces(data);
    };

    const onCreatePlace: PlacesContextProps['onCreatePlace'] = async (
        place
    ) => {};

    const onDeletePlace: PlacesContextProps['onDeletePlace'] = async (
        placeId
    ) => {};

    const onUpdatePlace: PlacesContextProps['onUpdatePlace'] = async (
        placeId
    ) => {};

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

export const usePlaces = () => useContext(PlacesContext);
