'use client';

import {
    Button,
    ContainerScrollBox,
    ContainerPage,
    Spinner,
    Frame,
    getCase,
} from '@sam/library';
import NextLink from 'next/link';

import { Places } from '../types/national-trust/places.type';

type PlacesViewProps = { places: Places };

export const PlacesView = ({ places }: PlacesViewProps) => {
    return places ? (
        <ContainerPage>
            <ContainerScrollBox>
                <Frame id='places-summary-frame'>
                    {places.placeSummaries
                        .sort((a, b) => {
                            if (a.name > b.name) {
                                return 1;
                            }

                            if (b.name > a.name) {
                                return -1;
                            }

                            return 0;
                        })
                        .map(({ name, placeId }) => {
                            return (
                                <Button
                                    key={placeId}
                                    link={{
                                        href: `Places/${getCase(name, 'pascal')}/${placeId}`,
                                        as: NextLink,
                                    }}
                                >
                                    {name}
                                </Button>
                            );
                        })}
                </Frame>
            </ContainerScrollBox>
        </ContainerPage>
    ) : (
        <Spinner isPageSpinner />
    );
};
