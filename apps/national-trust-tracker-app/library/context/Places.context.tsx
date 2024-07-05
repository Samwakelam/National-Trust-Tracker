'use client';

import {
    createContext,
    useContext,
    ReactElement,
    useState,
    ReactNode,
} from 'react';

import { getAllPlaces, putPlaceById } from '../../actions/Places.actions';

import { Place } from '../types/national-trust/place.type';
import { SavedPlace } from '../types/internal';
import { ActionResponse } from '../types';

// MARK: Types

type PlacesContextProps = {
    isLoading: boolean;
    places: Place[];
    getPlace: (placeId: string) => void;
    getPlaces: () => void;
    onCreatePlace: (place: Place) => Promise<ActionResponse>;
    onDeletePlace: (placeId: string) => Promise<ActionResponse>;
    onUpdatePlace: (place: SavedPlace) => Promise<ActionResponse>;
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
    onCreatePlace: function (place: Place): Promise<ActionResponse> {
        throw new Error('Function not implemented.');
    },
    onDeletePlace: function (placeId: string): Promise<ActionResponse> {
        throw new Error('Function not implemented.');
    },
    onUpdatePlace: function (place: SavedPlace): Promise<ActionResponse> {
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
        const res = await getAllPlaces();

        if (res.message === 'Success') {
            setPlaces(res.data);
        }
    };

    // MARK: Event Functions

    const onCreatePlace: PlacesContextProps['onCreatePlace'] = async (
        place
    ) => {
        return { status: 501, message: 'Error', error: 'not implemented' };
    };

    const onDeletePlace: PlacesContextProps['onDeletePlace'] = async (
        placeId
    ) => {
        return { status: 501, message: 'Error', error: 'not implemented' };
    };

    const onUpdatePlace: PlacesContextProps['onUpdatePlace'] = async (
        place
    ) => {
        try {
            setIsLoading(true);

            const putBody = JSON.parse(JSON.stringify(place));
            const res = await putPlaceById(`${place.placeId}`, putBody);

            if (res.message === 'Error' && res.error)
                throw new Error(res.error);

            return res;
        } catch (error) {
            console.log('error onUpdatePlace: ', error);
            return { status: 500, message: 'Error', error };
        } finally {
            setIsLoading(false);
        }
    };

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
