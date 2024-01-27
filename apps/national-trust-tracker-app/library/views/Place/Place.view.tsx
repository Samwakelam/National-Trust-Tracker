'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { LatLng, LatLngExpression, Marker as LeafletMarker } from 'leaflet';
import { useRouter } from 'next/navigation';

import {
    ContainerScrollBox,
    ContainerPage,
    Spinner,
    Frame,
    FrameControlsBanner,
    Card,
    Icon,
    Heading,
    Button,
    Alert,
    getCase,
    InputGroup,
    Tag,
} from '@sam/library';

import {
    AdmissionCategory,
    Day,
    DirectionType,
    NoteCategory,
    PostalAddress,
    AccessTag,
} from '../../types/national-trust';

// import { MiniMap } from '../components/Map';

import * as Chakra from '@chakra-ui/react';

import '../../prototypes/String.extensions';
import { getAmountInPounds, resolveCurrency, resolveIcon } from '../../helpers';
import { useForm } from 'react-hook-form';
import { DrawerLogVisit } from './partials';
import { DisclosureType, Form, PlaceViewProps } from './Place.definition';

export const PlaceView = ({
    place,
    accessTags,
    admissionPrices,
    directions,
    downloadableContent,
    facilities,
    notes,
    opening,
    openingTimes,
    ...props
}: PlaceViewProps) => {
    console.log('props: ', props);

    const markerRef = useRef<LeafletMarker<any>>(null);
    const router = useRouter();

    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const [openingDate, setOpeningDate] = useState<string | undefined>(
        new Date().toJSON().split('T')[0]
    );
    const [isOpen, setIsOpen] = useState<Record<DisclosureType, boolean>>({
        log: false,
    });

    const {
        register,
        formState: { errors },
        watch,
    } = useForm<Form>({ mode: 'onChange' });

    const mapEventHandlers = useMemo(() => {
        return {
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const latLng: LatLng = marker.getLatLng();
                    setPosition(latLng);
                }
            },
        };
    }, []);

    const handleDisclosure = (
        disclosure: DisclosureType,
        action: 'open' | 'close'
    ) => {
        setIsOpen((prev) => ({
            ...prev,
            [disclosure]: action === 'open' ? true : false,
        }));
    };

    // const parseHtmlString = (string: string): string[] => {
    //     return string
    //         .split(/<p>(.*?)p>/g)
    //         .filter((item) => item.includes('/'))
    //         .map((item) =>
    //             item
    //                 .replaceAll('</', '')
    //                 .replaceAll('&#39;', '"')
    //                 .replaceAll('&rsquo;', "'")
    //                 .replaceAll('&nbsp;', ' ')
    //         );
    // };

    useEffect(() => {
        if (place) {
            setPosition({
                lat: place.location.latitudeLongitude.latitude,
                lng: place.location.latitudeLongitude.longitude,
            });
        }
    }, [place]);

    useEffect(() => {
        const date = watch('date');
        if (!date) {
            setOpeningDate(undefined);
            setTimeout(() => {
                setOpeningDate(new Date().toJSON().split('T')[0]);
            }, 10000);
        }

        if (date) {
            setOpeningDate(date);
        }
    }, [watch('date')]);

    return place ? (
        <ContainerPage
            flexDirection='column'
            display='flex'
        >
            {place.emergencyNotice && (
                <Alert
                    title='Notice'
                    status='warning'
                    description={place.emergencyNotice}
                />
            )}
            <ContainerScrollBox>
                <Frame
                    bgImage={place.images.PRIMARY.url}
                    id='frame-hero-image'
                    showOverlay='from-left'
                >
                    <Chakra.Flex
                        w='100%'
                        direction='column'
                        gap={16}
                    >
                        <Heading
                            preset='frame-heading'
                            color='white.300'
                        >
                            {place.name}
                        </Heading>
                        <Button
                            link={{
                                href: place.websiteUrl,
                                as: Chakra.Link,
                                isExternal: true,
                                target: '_blank',
                            }}
                            colorScheme='white'
                        >
                            Website
                        </Button>
                        <Chakra.Text
                            color='white.300'
                            w={['70%', '50%']}
                        >
                            {place.description.strapline}
                        </Chakra.Text>
                    </Chakra.Flex>
                </Frame>

                <FrameControlsBanner
                    id='place-frame-controls'
                    navigationCTA={{ onClick: () => router.back() }}
                >
                    <Button
                        icon={{
                            icon: 'location-edit',
                            ariaLabel: 'log location',
                        }}
                        onClick={() => handleDisclosure('log', 'open')}
                        tooltip={{ label: 'Log a visit', hasArrow: true }}
                    />
                </FrameControlsBanner>

                <Frame
                    id='frame-place-description'
                    colorScheme='gray'
                >
                    <Chakra.Grid
                        gridTemplateColumns={[
                            'repeat(1, 1fr)',
                            'repeat(2, 1fr)',
                        ]}
                        alignItems='center'
                        rowGap={20}
                        columnGap={32}
                    >
                        <Chakra.GridItem>
                            <Chakra.Image
                                alt={place.images.PRIMARY.description}
                                src={place.images.PRIMARY.url}
                                objectFit='cover'
                                height='100%'
                            />
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            display='flex'
                            flexDirection='column'
                            gap={16}
                        >
                            <Chakra.Text>
                                {place.description.htmlDescription}
                            </Chakra.Text>
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Frame>

                <Frame id='place-frame'>
                    <Chakra.Flex
                        direction='row'
                        gap={16}
                    >
                        <Chakra.Box
                            flex={1}
                            maxHeight='200px'
                        ></Chakra.Box>
                        <Card colorScheme='gray'>
                            <Chakra.Flex
                                direction='row'
                                gap={8}
                            >
                                <Icon
                                    icon='detail'
                                    ariaLabel='address'
                                />
                                <Chakra.Flex
                                    direction='column'
                                    gap={8}
                                >
                                    {Object.keys(
                                        place.location.postalAddress
                                    ).map((item) => {
                                        const value =
                                            place.location.postalAddress[
                                                item as keyof PostalAddress
                                            ];

                                        return (
                                            <Chakra.chakra.span
                                                display='flex'
                                                flexDirection='row'
                                                gap={8}
                                                key={item}
                                            >
                                                <Chakra.Text as='b'>
                                                    {item === 'lines'
                                                        ? null
                                                        : item.toCapitalisedCase()}
                                                </Chakra.Text>
                                                <Chakra.Text>
                                                    {Array.isArray(value)
                                                        ? value.map((v) => {
                                                              return v;
                                                          })
                                                        : value}
                                                </Chakra.Text>
                                            </Chakra.chakra.span>
                                        );
                                    })}
                                    <Chakra.chakra.span
                                        display='flex'
                                        flexDirection='row'
                                        gap={8}
                                    >
                                        <Chakra.Text as='b'>Region</Chakra.Text>
                                        <Chakra.Text>
                                            {place.location.region}
                                        </Chakra.Text>
                                    </Chakra.chakra.span>
                                </Chakra.Flex>
                            </Chakra.Flex>
                        </Card>
                    </Chakra.Flex>
                </Frame>

                {admissionPrices && (
                    <Frame
                        id='admission-prices-frame'
                        colorScheme='black'
                    >
                        <Heading preset='frame-heading'>Admission</Heading>
                        <Chakra.Flex
                            direction='column'
                            maxW='800px'
                            alignItems='center'
                            textAlign='center'
                            gap={8}
                        >
                            <Chakra.Text>
                                {admissionPrices.htmlNote}
                            </Chakra.Text>
                        </Chakra.Flex>

                        <Chakra.Grid
                            gridTemplateColumns={[
                                'repeat(1, 1fr)',
                                'repeat(2, 1fr)',
                            ]}
                            columnGap={32}
                            rowGap={20}
                        >
                            {admissionPrices.categories.map(
                                (
                                    category: AdmissionCategory,
                                    index: number
                                ) => {
                                    return (
                                        <Chakra.GridItem
                                            key={`${getCase(category.name, 'kebab')}-${index}`}
                                            display='flex'
                                            flexDirection='column'
                                            alignItems='center'
                                        >
                                            <Heading preset='sub-heading'>
                                                {category.name}
                                            </Heading>

                                            <Chakra.Flex
                                                direction='column'
                                                gap={16}
                                            >
                                                {category.admissionPrices.map(
                                                    (price) => {
                                                        return (
                                                            <Chakra.Flex
                                                                key={`admission-price-${price.name}`}
                                                                gap={16}
                                                                justifyContent='space-between'
                                                            >
                                                                <Chakra.Text as='b'>
                                                                    {price.name.toCapitalisedCase()}
                                                                </Chakra.Text>
                                                                <Chakra.Text
                                                                    key={`admission-price-${price.standardAmount.amount}`}
                                                                    display='flex'
                                                                    gap={8}
                                                                    justifyContent='space-between'
                                                                >
                                                                    <Chakra.chakra.span>
                                                                        {resolveCurrency(
                                                                            price
                                                                                .standardAmount
                                                                                .currency
                                                                        )}
                                                                    </Chakra.chakra.span>
                                                                    <Chakra.chakra.span>
                                                                        {getAmountInPounds(
                                                                            price
                                                                                .standardAmount
                                                                                .amount
                                                                        )}
                                                                    </Chakra.chakra.span>
                                                                </Chakra.Text>
                                                            </Chakra.Flex>
                                                        );
                                                    }
                                                )}
                                            </Chakra.Flex>
                                        </Chakra.GridItem>
                                    );
                                }
                            )}
                        </Chakra.Grid>
                    </Frame>
                )}

                {opening && (
                    <Frame id='opening-times-frame'>
                        <Heading preset='frame-heading'>Opening Times</Heading>

                        <Chakra.Grid
                            gridTemplateColumns={[
                                'repeat(1, 1fr)',
                                'repeat(2, 1fr)',
                            ]}
                            rowGap={20}
                            columnGap={32}
                            w='100%'
                        >
                            <Chakra.GridItem
                                display='flex'
                                flexDirection='column'
                                gap={20}
                            >
                                <InputGroup<Form>
                                    name='date'
                                    label='Choose Date'
                                    labelConfig={{ hideBadge: true }}
                                    inputConfig={{
                                        type: 'date',
                                        defaultValue: openingDate,
                                    }}
                                    formRegister={{ register }}
                                    errors={errors}
                                />

                                {openingDate && (
                                    <Chakra.Flex
                                        direction='column'
                                        gap={16}
                                    >
                                        {resolveOpenStatus(
                                            opening.days[openingDate]?.status
                                        )}

                                        <Chakra.Flex
                                            direction='column'
                                            gap={16}
                                        >
                                            {opening.days[
                                                openingDate
                                            ]?.assets.map((asset) => {
                                                return (
                                                    <Chakra.Flex
                                                        key={`opening-times-asset-${asset.name}`}
                                                        gap={16}
                                                    >
                                                        <Chakra.Text as='b'>
                                                            {asset.name.toCapitalisedCase()}
                                                        </Chakra.Text>
                                                        <Chakra.Text>
                                                            {asset.description}
                                                        </Chakra.Text>
                                                    </Chakra.Flex>
                                                );
                                            })}
                                        </Chakra.Flex>
                                    </Chakra.Flex>
                                )}
                            </Chakra.GridItem>
                        </Chakra.Grid>
                    </Frame>
                )}

                {directions && (
                    <Frame
                        id='directions-frame'
                        colorScheme='gray'
                    >
                        <Heading preset='frame-heading'>Directions</Heading>

                        <Chakra.Grid
                            gridTemplateColumns={[
                                'repeat(1, 1fr)',
                                'repeat(2, 1fr)',
                            ]}
                            alignItems='center'
                            rowGap={20}
                            columnGap={32}
                        >
                            <Chakra.GridItem
                                display='flex'
                                flexDirection='column'
                                gap={20}
                            >
                                {Object.keys(directions.directions).map(
                                    (key) => {
                                        const icon = resolveIcon(key);

                                        return (
                                            <Chakra.Flex
                                                key={`direction-${key}`}
                                                flexDirection='column'
                                                gap={8}
                                            >
                                                <Chakra.Flex
                                                    gap={8}
                                                    alignItems='center'
                                                >
                                                    {icon && <Icon {...icon} />}
                                                    <Chakra.Text as='b'>
                                                        {key.toCapitalisedCase()}
                                                    </Chakra.Text>
                                                </Chakra.Flex>
                                                <Chakra.Text>
                                                    {
                                                        directions.directions[
                                                            key as DirectionType
                                                        ].htmlDescription
                                                    }
                                                </Chakra.Text>
                                            </Chakra.Flex>
                                        );
                                    }
                                )}
                            </Chakra.GridItem>
                            {position && (
                                <Chakra.GridItem>
                                    {/* <Suspense fallback={<Spinner />}>
                                            <MiniMap
                                                mapConfig={{ zoom: 12 }}
                                                ref={markerRef}
                                                eventHandlers={mapEventHandlers}
                                                position={{
                                                    lat: place.location
                                                        .latitudeLongitude
                                                        .latitude,
                                                    lng: place.location
                                                        .latitudeLongitude
                                                        .longitude,
                                                }}
                                            />
                                        </Suspense> */}
                                </Chakra.GridItem>
                            )}
                        </Chakra.Grid>
                    </Frame>
                )}

                {facilities && (
                    <Frame id='facilities-frame'>
                        <Heading preset='frame-heading'>Facilities</Heading>

                        <Chakra.Grid
                            gridTemplateColumns={[
                                'repeat(1, 1fr)',
                                'repeat(2, 1fr)',
                            ]}
                            alignItems='center'
                            rowGap={20}
                            columnGap={32}
                        >
                            {facilities.facilities.map((facility) => {
                                if (!facility.available || !facility.reference)
                                    return null;

                                const icon = resolveIcon(facility.reference);

                                return (
                                    <Chakra.GridItem
                                        key={`facility-${facility.reference}`}
                                        display='flex'
                                        flexDirection='column'
                                        gap={8}
                                    >
                                        <Chakra.Flex
                                            gap={8}
                                            alignItems='center'
                                        >
                                            {icon && <Icon {...icon} />}

                                            <Chakra.Text
                                                display='flex'
                                                flexDirection='row'
                                                as='b'
                                            >
                                                {facility.name}
                                            </Chakra.Text>
                                        </Chakra.Flex>
                                        <Chakra.Text>
                                            {facility.description}
                                        </Chakra.Text>
                                    </Chakra.GridItem>
                                );
                            })}
                        </Chakra.Grid>
                    </Frame>
                )}

                {accessTags && (
                    <Frame
                        id='accessibility-frame'
                        colorScheme='white'
                    >
                        <Heading preset='frame-heading'>Accessibility</Heading>
                        <Chakra.Grid
                            gridTemplateColumns={[
                                'repeat(1, 1fr)',
                                'repeat(2, 1fr)',
                            ]}
                            alignItems='center'
                            rowGap={20}
                            columnGap={32}
                        >
                            {accessTags.tags.map((tag: AccessTag) => {
                                const icon = resolveIcon(tag.reference);
                                return (
                                    <Chakra.GridItem
                                        key={`facility-${tag.reference}`}
                                        display='flex'
                                        flexDirection='column'
                                        gap={8}
                                    >
                                        <Chakra.Flex
                                            gap={8}
                                            alignItems='center'
                                        >
                                            {icon && <Icon {...icon} />}

                                            <Chakra.Text
                                                display='flex'
                                                flexDirection='row'
                                                as='b'
                                            >
                                                {tag.name}
                                            </Chakra.Text>
                                        </Chakra.Flex>
                                        <Chakra.Text>
                                            {tag.description}
                                        </Chakra.Text>
                                    </Chakra.GridItem>
                                );
                            })}
                        </Chakra.Grid>
                    </Frame>
                )}

                {notes && (
                    <Frame
                        id='notes-frame'
                        colorScheme='gray'
                    >
                        <Heading preset='frame-heading'>Notes</Heading>

                        <Chakra.Flex
                            direction='column'
                            gap={20}
                            w={['100%', '80%']}
                        >
                            {notes.noteCategories.map(
                                (category: NoteCategory) => {
                                    return (
                                        <Chakra.Flex
                                            direction='column'
                                            key={`notes-category-${category.name}`}
                                            gap={8}
                                        >
                                            <Chakra.Text as='b'>
                                                {category.name.toCapitalisedCase()}
                                            </Chakra.Text>
                                            <Chakra.Text>
                                                {category.htmlNotes}
                                            </Chakra.Text>
                                        </Chakra.Flex>
                                    );
                                }
                            )}
                        </Chakra.Flex>
                    </Frame>
                )}
            </ContainerScrollBox>
            <DrawerLogVisit
                isOpen={isOpen.log}
                onClose={() => handleDisclosure('log', 'close')}
                place={{
                    place,
                    admissionPrices,
                    facilities,
                    opening,
                    directions,
                    accessTags,
                }}
            />
        </ContainerPage>
    ) : (
        <Spinner isPageSpinner />
    );
};

const resolveOpenStatus = (status: Day['status'] | undefined) => {
    switch (status) {
        case 'CLOSED':
            return (
                <Tag
                    icon={{
                        icon: 'circle-cross',
                        ariaLabel: 'closed',
                    }}
                    variant='subtle'
                    colorScheme='red'
                >
                    Closed
                </Tag>
            );
        case 'FULLY_OPEN':
            return (
                <Tag
                    icon={{
                        icon: 'circle-tick',
                        ariaLabel: 'open',
                    }}
                    variant='subtle'
                    colorScheme='green'
                >
                    Open
                </Tag>
            );
        case 'PARTIALLY_OPEN':
            return (
                <Tag
                    icon={{
                        icon: 'circle-info',
                        ariaLabel: 'info',
                    }}
                    variant='subtle'
                    colorScheme='yellow'
                >
                    Partially Open
                </Tag>
            );
        default:
            return (
                <Tag
                    icon={{
                        icon: 'warning',
                        ariaLabel: 'warning',
                    }}
                    variant='subtle'
                    colorScheme='orange'
                >
                    No Data
                </Tag>
            );
    }
};
