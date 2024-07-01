'use client';

import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { twMerge } from '../../utilities/twMerge.util';
import { Frame } from '../Frame';
import { Carousel } from './Carousel.component';

const getChildren = (number: number) => {
    return Array.from({ length: number }, (_, index) => {
        return (
            <div
                className={twMerge(
                    'h-384 w-full flex flex-row justify-center items-center',
                    index % 2 === 0 ? 'bg-yellow-100' : 'bg-pink-300'
                )}
                key={`carousel-fixture-slide-${index}`}
            >
                <h3>Slide {index + 1}</h3>
            </div>
        );
    });
};

const CarouselFixture = () => {
    const [isFullWidth] = useFixtureInput<boolean>('Is Full Width', false);

    const [numberOfChildren] = useFixtureSelect('Number of Slides', {
        options: ['3', '4', '5', '6'],
        defaultValue: '3',
    });

    const [visibleSlides] = useFixtureSelect('Visible Slides', {
        options: ['1', '2', '3', '4'],
        defaultValue: '2',
    });

    return (
        <Frame id='frame'>
            <Carousel
                isFullWidth={isFullWidth}
                // @ts-ignore
                visibleSlides={parseInt(visibleSlides)}
            >
                {getChildren(parseInt(numberOfChildren))}
            </Carousel>
        </Frame>
    );
};

export default CarouselFixture;
