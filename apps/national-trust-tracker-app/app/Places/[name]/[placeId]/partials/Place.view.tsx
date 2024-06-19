'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import {
    AdmissionCategory,
    Day,
    DirectionType,
    NoteCategory,
    PostalAddress,
    AccessTag,
    AdmissionPrices,
} from '../../../../../library/types/national-trust';
import {
    getAmountInPounds,
    getCase,
    resolveCurrency,
    resolveIcon,
} from '../../../../../library/helpers';

import { DrawerAddVisit } from './DrawerAddVisit.component';
import { resolveCategoriesFromHTML } from './Place.helpers';
import { DisclosureType, PlaceViewProps } from './Place.definition';

import '../../../../../library/prototypes/String.extensions';
import {
    Button,
    Card,
    Frame,
    HtmlParser,
    Icon,
    Tag,
} from '../../../../../library/components';

import 'leaflet/dist/leaflet.css';

// MARK: View

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
    const markerRef = useRef(null);
    const router = useRouter();

    // const [position, setPosition] = useState<LatLngExpression | null>(null);
    const [openingDate, setOpeningDate] = useState<string | undefined>(
        new Date().toJSON().split('T')[0]
    );
    const [isOpen, setIsOpen] = useState<Record<DisclosureType, boolean>>({
        log: false,
    });

    const Map = useMemo(
        () =>
            dynamic(
                () =>
                    import(
                        '../../../../../library/components/Map/Map.component'
                    ).then((module) => module.Map),
                {
                    ssr: false,
                    loading: () => (
                        <div className='w-full h-full'>Loading Map</div>
                    ),
                }
            ),
        []
    );

    // const mapEventHandlers = useMemo(() => {
    //     return {
    //         dragend() {
    //             const marker = markerRef.current;
    //             if (marker != null) {
    //                 const latLng: LatLng = marker.getLatLng();
    //                 setPosition(latLng);
    //             }
    //         },
    //     };
    // }, []);

    const _admissionPrices: AdmissionPrices | undefined = useMemo(() => {
        const admissionCategories = admissionPrices?.categories;

        if (admissionCategories?.length === 0) {
            const categories = admissionPrices?.htmlNote
                ? resolveCategoriesFromHTML(admissionPrices?.htmlNote)
                : [];

            const noFee: AdmissionCategory = {
                name: 'No Fee',
                admissionPrices: [
                    {
                        name: 'Adult',
                        standardAmount: {
                            currency: 'GBP',
                            amount: 0,
                        },
                    },
                ],
            };

            return {
                htmlNote: '',
                links: [],
                ...admissionPrices,
                categories: categories.length > 0 ? categories : [noFee],
            };
        }

        return admissionPrices;
    }, [admissionPrices]);

    // MARK: Functions

    const handleDisclosure = (
        disclosure: DisclosureType,
        action: 'open' | 'close'
    ) => {
        setIsOpen((prev) => ({
            ...prev,
            [disclosure]: action === 'open' ? true : false,
        }));
    };

    // MARK: Effects

    // useEffect(() => {
    //     if (place) {
    //         setPosition({
    //             lat: place.location.latitudeLongitude.latitude,
    //             lng: place.location.latitudeLongitude.longitude,
    //         });
    //     }
    // }, [place]);

    // useEffect(() => {
    //     const date = watch('date');
    //     if (!date) {
    //         setOpeningDate(undefined);
    //         setTimeout(() => {
    //             setOpeningDate(new Date().toJSON().split('T')[0]);
    //         }, 10000);
    //     }

    //     if (date) {
    //         setOpeningDate(date);
    //     }
    // }, [watch('date')]);

    // MARK: Return

    return (
        place && (
            <div
                data-label='place-view'
                className='flex flex-col bg-slate-100 min-h-full'
            >
                {/* {place.emergencyNotice && (
                <Alert
                    title='Notice'
                    status='warning'
                    description={place.emergencyNotice}
                />
            )} */}

                <Frame
                    bgImage={place.images.PRIMARY.url || undefined}
                    id='frame-hero-image'
                >
                    <div className='flex flex-col gap-16 w-full items-start'>
                        <h2>{place.name}</h2>
                        <Button
                            link={{
                                href: place.websiteUrl,
                                target: '_blank',
                            }}
                            colorScheme='white'
                        >
                            Website
                        </Button>
                        <p className='w-7/10 sm:w-1/2'>
                            {place.description.strapline}
                        </p>
                    </div>
                </Frame>

                <Frame
                    id='place-frame-controls'
                    preset='controls'
                    navigationCTA={{ onClick: () => router.back() }}
                >
                    <Button
                        icon={{
                            icon: 'location-edit',
                            ariaLabel: 'log location',
                        }}
                        divergent='soft'
                        onClick={() => handleDisclosure('log', 'open')}
                        // tooltip={{ label: 'Log a visit', hasArrow: true }}
                    />
                </Frame>

                {/* MARK: Description
                 */}

                <Frame
                    id='frame-place-description'
                    colorScheme='slate'
                >
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-20 gap-x-32 items-center'>
                        {place.images.PRIMARY.url && (
                            <img
                                className='h-full object-cover'
                                alt={place.images.PRIMARY.description}
                                src={place.images.PRIMARY.url}
                            />
                        )}

                        <div className='flex flex-col gap-16'>
                            <HtmlParser
                                htmlString={place.description.htmlDescription}
                            />
                        </div>
                    </div>
                </Frame>

                {/* MARK: Location
                 */}

                <Frame
                    id='place-frame'
                    colorScheme='white'
                >
                    <div className='flex flex-row gap-16 w-full '>
                        <Card>
                            <div className='flex flex-row gap-8'>
                                <Icon
                                    icon='detail'
                                    ariaLabel='address'
                                />
                                <div className='flex flex-col gap-8'>
                                    {Object.keys(
                                        place.location.postalAddress
                                    ).map((item) => {
                                        const value =
                                            place.location.postalAddress[
                                                item as keyof PostalAddress
                                            ];

                                        return (
                                            <span
                                                className='flex flex-row gap-8'
                                                key={item}
                                            >
                                                <p className='font-bold'>
                                                    {item === 'lines'
                                                        ? null
                                                        : item.toCapitalisedCase()}
                                                </p>
                                                <p>
                                                    {Array.isArray(value)
                                                        ? value.map((v) => {
                                                              return v;
                                                          })
                                                        : value}
                                                </p>
                                            </span>
                                        );
                                    })}
                                    <span className='flex flex-row gap-8'>
                                        <p className='font-bold'>Region</p>
                                        <p>{place.location.region}</p>
                                    </span>
                                </div>
                            </div>
                        </Card>
                        <div
                            data-label='map-container'
                            className='aspect-video h-full flex-1'
                        >
                            <Map
                                ref={markerRef}
                                position={[
                                    place.location.latitudeLongitude.latitude,
                                    place.location.latitudeLongitude.longitude,
                                ]}
                            />
                        </div>
                    </div>
                </Frame>

                {/* MARK: Admission Prices
                 */}

                {_admissionPrices && (
                    <Frame
                        id='admission-prices-frame'
                        colorScheme='black'
                    >
                        <h2>Admission</h2>

                        <HtmlParser htmlString={_admissionPrices.htmlNote} />

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-20'>
                            {_admissionPrices.categories.map(
                                (
                                    category: AdmissionCategory,
                                    index: number
                                ) => {
                                    return (
                                        <div
                                            className='flex flex-col items-center'
                                            key={`${getCase(category.name, 'kebab')}-${index}`}
                                        >
                                            <h2>{category.name}</h2>

                                            <div className='flex flex-col gap-16'>
                                                {category.admissionPrices.map(
                                                    (price) => {
                                                        return (
                                                            <div
                                                                className='flex flex-row gap-16 justify-between'
                                                                key={`admission-price-${price.name}`}
                                                            >
                                                                <p className='font-bold'>
                                                                    {price.name.toCapitalisedCase()}
                                                                </p>
                                                                <p
                                                                    className=''
                                                                    key={`admission-price-${price.standardAmount.amount}`}
                                                                >
                                                                    <span>
                                                                        {resolveCurrency(
                                                                            price
                                                                                .standardAmount
                                                                                .currency
                                                                        )}
                                                                    </span>
                                                                    <span>
                                                                        {getAmountInPounds(
                                                                            price
                                                                                .standardAmount
                                                                                .amount
                                                                        )}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </Frame>
                )}

                {/* MARK: Opening Times
                 */}

                {opening && (
                    <Frame
                        id='opening-times-frame'
                        colorScheme='forest'
                    >
                        <h2>Opening Times</h2>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-20 gap-x-32 w-full'>
                            <div className='flex flex-col gap-20'>
                                {/* <InputGroup<Form>
                                    name='date'
                                    label='Choose Date'
                                    labelConfig={{ hideBadge: true }}
                                    inputConfig={{
                                        type: 'date',
                                        defaultValue: openingDate,
                                    }}
                                    formRegister={{ register }}
                                    errors={errors}
                                /> */}

                                {openingDate && (
                                    <div className='flex flex-col gap-16'>
                                        {resolveOpenStatus(
                                            opening.days[openingDate]?.status
                                        )}

                                        <div className='flex flex-col gap-16'>
                                            {opening.days[
                                                openingDate
                                            ]?.assets.map((asset) => {
                                                return (
                                                    <div
                                                        className='flex flex-row gap-16'
                                                        key={`opening-times-asset-${asset.name}`}
                                                    >
                                                        <p className='font-bold'>
                                                            {asset.name.toCapitalisedCase()}
                                                        </p>
                                                        <p>
                                                            {asset.description}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Frame>
                )}

                {/* MARK: Directions
                 */}

                {directions && (
                    <Frame id='directions-frame'>
                        <h2>Directions</h2>

                        <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-x-32 gap-y-20'>
                            <div className='flex flex-col gap-20'>
                                {Object.keys(directions.directions).map(
                                    (key) => {
                                        const icon = resolveIcon(key);

                                        return (
                                            <div
                                                className='flex flex-col gap-8'
                                                key={`direction-${key}`}
                                            >
                                                <div className='flex flex-row gap-8 items-center'>
                                                    {icon && <Icon {...icon} />}
                                                    <p className='font-bold'>
                                                        {key.toCapitalisedCase()}
                                                    </p>
                                                </div>
                                                <HtmlParser
                                                    htmlString={
                                                        directions.directions[
                                                            key as DirectionType
                                                        ].htmlDescription
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            {/* {position && (
                          
                                    <Suspense fallback={<Spinner />}>
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
                                        </Suspense> 
                            
                            )} */}
                        </div>
                    </Frame>
                )}

                {/* MARK: Facilities
                 */}

                {facilities && (
                    <Frame
                        id='facilities-frame'
                        colorScheme='slate'
                    >
                        <h2>Facilities</h2>

                        <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-y-20 gap-x-32'>
                            {facilities.facilities.map((facility) => {
                                if (!facility.available || !facility.reference)
                                    return null;

                                const icon = resolveIcon(facility.reference);

                                return (
                                    <div
                                        className='flex flex-col gap-8'
                                        key={`facility-${facility.reference}`}
                                    >
                                        <div className='flex flex-row gap-8 items-center'>
                                            {icon && <Icon {...icon} />}

                                            <p className='font-bold'>
                                                {facility.name}
                                            </p>
                                        </div>
                                        <p>{facility.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Frame>
                )}

                {/* MARK: Accessibility
                 */}

                {accessTags && (
                    <Frame
                        id='accessibility-frame'
                        colorScheme='white'
                    >
                        <h2>Accessibility</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-y-20 gap-x-32'>
                            {accessTags.tags.map((tag: AccessTag) => {
                                const icon = resolveIcon(tag.reference);
                                return (
                                    <div
                                        className='flex flex-col gap-8'
                                        key={`facility-${tag.reference}`}
                                    >
                                        <div className='flex flex-row gap-8 items-center'>
                                            {icon && <Icon {...icon} />}

                                            <p className='font-bold'>
                                                {tag.name}
                                            </p>
                                        </div>
                                        <p>{tag.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Frame>
                )}

                {/* MARK: Notes
                 */}

                {notes && (
                    <Frame id='notes-frame'>
                        <h2>Notes</h2>

                        <div className='flex flex-col gap-20 w-full sm:w-4/5'>
                            {notes.noteCategories.map(
                                (category: NoteCategory) => {
                                    return (
                                        <div
                                            className='flex flex-col gap-8'
                                            key={`notes-category-${category.name}`}
                                        >
                                            <p className='font-bold'>
                                                {category.name.toCapitalisedCase()}
                                            </p>
                                            <HtmlParser
                                                htmlString={category.htmlNotes.join(
                                                    ' '
                                                )}
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </Frame>
                )}

                <DrawerAddVisit
                    isOpen={isOpen.log}
                    onClose={() => handleDisclosure('log', 'close')}
                    place={{
                        place,
                        admissionPrices: _admissionPrices,
                        facilities,
                        opening,
                        directions,
                        accessTags,
                    }}
                />
            </div>
        )
    );
};

// MARK: Resolve Functions

const resolveOpenStatus = (status: Day['status'] | undefined) => {
    switch (status) {
        case 'CLOSED':
            return (
                <Tag
                    icon={{
                        icon: 'circle-cross',
                        ariaLabel: 'closed',
                    }}
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
                >
                    No Data
                </Tag>
            );
    }
};
