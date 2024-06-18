'use client';

import { Children, ReactElement, useState, useRef, useEffect } from 'react';
import { Button } from '../Button';
import { CarouselStyles, useCarouselStyles } from './Carousel.styles';
import { twMerge } from '../../utilities/twMerge.util';

export interface CarouselProps extends CarouselStyles {
    children: ReactElement | ReactElement[];
    visibleSlides?: 1 | 2 | 3 | 4;
}

// MARK: Component

export const Carousel = ({
    children,
    colorScheme,
    divergents,
    isFullWidth = false,
    visibleSlides = 1,
}: CarouselProps) => {
    const carousel = useRef<HTMLDivElement | null>(null);

    const availableSlides = Children.toArray(children).length;

    // MARK: Styles

    const { container, viewport, slide } = useCarouselStyles({
        divergents,
        colorScheme,
        isFullWidth,
    });

    // MARK: State

    const [triggers, setTriggers] = useState({
        previous: false,
        next: true,
    });

    // MARK: Handlers

    const next = (multiplier: number): void => {
        if (!carousel?.current) return;

        carousel.current.scrollBy({
            top: 0,
            left:
                (carousel.current!.children[0]!.clientWidth + 16) * multiplier,
            behavior: 'smooth',
        });
    };

    // MARK: Effects

    useEffect(() => {
        if (!carousel.current) return;
        carousel.current.scrollTo(0, 0);

        const onScroll = () => {
            const _triggers = {
                previous: carousel.current!.scrollLeft > 0,
                next:
                    carousel.current!.scrollLeft <
                    carousel.current!.scrollWidth -
                        carousel.current!.clientWidth -
                        16,
            };

            setTriggers(_triggers);
        };

        carousel.current.addEventListener('scroll', onScroll);

        return () => {
            carousel.current?.removeEventListener('scroll', onScroll);
        };
    }, []);

    // MARK: Return

    return (
        <section
            data-label='carousel'
            className={twMerge(container())}
        >
            <Button
                icon={{ icon: 'chevron-l', ariaLabel: 'previous' }}
                className={twMerge(
                    'absolute hidden lg:grid left-[2.5%]',
                    visibleSlides === availableSlides && 'lg:hidden'
                )}
                onClick={() => {
                    next(-1);
                }}
                isDisabled={!triggers.previous}
                colorScheme={colorScheme}
            />

            <div
                data-label='carousel-viewport'
                className={twMerge(viewport())}
                ref={carousel}
            >
                {Children.toArray(children).map((child, index) => {
                    return (
                        <article
                            data-label='carousel-slide'
                            key={`carousel_slide_${index}`}
                            id={`carousel_slide_${index}`}
                            className={twMerge(
                                slide(twMerge(resolveBasis(visibleSlides)))
                            )}
                        >
                            {child}
                        </article>
                    );
                })}
            </div>

            <Button
                icon={{
                    icon: 'chevron-r',
                    ariaLabel: 'next',
                }}
                className={twMerge(
                    'absolute hidden lg:grid right-[2.5%]',
                    visibleSlides === availableSlides && 'lg:hidden'
                )}
                onClick={() => {
                    next(1);
                }}
                isDisabled={!triggers.next || availableSlides <= visibleSlides}
                colorScheme={colorScheme}
            />
        </section>
    );
};

const resolveBasis = (visibleSlides: CarouselProps['visibleSlides']) => {
    switch (visibleSlides) {
        case 1:
            return `lg:basis-[calc((100%-0px)/1)]`;
        case 2:
            return `lg:basis-[calc((100%-16px)/2)]`;
        case 3:
            return `lg:basis-[calc((100%-32px)/3)]`;
        case 4:
            return `lg:basis-[calc((100%-48px)/4)]`;
        default:
            return 'lg:basis-full';
        // case 5:
        //     return `lg:basis-[calc((100%-64px)/5)]`;
        // case 6:
        //     return `lg:basis-[calc((100%-80px)/6)]`;
    }
};
