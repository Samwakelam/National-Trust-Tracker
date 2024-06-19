'use client';

import { useEffect, useState } from 'react';
import { useVisits } from '../../../library/context/Visits.context';
import { twMerge } from '../../../library/utilities/twMerge.util';
import { FilterVisits } from './FilterVisits.component';
import { VisitCard } from './VisitCard.component';
import { VisitDB } from '../../../library/types/internal';

type FiltersState = {
    name: string;
    dateFrom: string;
    dateTo: string;
    region: string;
};

export const VisitsView = () => {
    const { visits } = useVisits();

    // MARK: State

    const [visitsFilters, setVisitsFilters] = useState<FiltersState>({
        name: '',
        dateTo: '',
        dateFrom: '',
        region: '',
    });
    const [visitsList, setVisitsList] = useState<VisitDB[]>(visits);

    // MARK: Handlers

    const handleVisitsFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.currentTarget.value;

        setVisitsFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // MARK: Effects

    useEffect(() => {
        const name = visitsFilters.name;
        const dateTo = visitsFilters.dateTo;
        const dateFrom = visitsFilters.dateFrom;
        const region = visitsFilters.region;

        if (!name && !dateTo && !dateFrom) setVisitsList(visits);

        const newVisits = visits.filter((visit) => {
            return (
                (name
                    ? visit.place.name
                          .toLowerCase()
                          .includes(name.toLowerCase())
                    : true) &&
                (dateFrom
                    ? new Date(visit.date) >= new Date(dateFrom)
                    : true) &&
                (dateTo ? new Date(visit.date) <= new Date(dateTo) : true) &&
                (region ? visit.place.location.region.includes(region) : true)
            );
        });
        setVisitsList(newVisits);
    }, [visitsFilters]);

    // MARK: Return

    return (
        <>
            <div
                data-label='page-container'
                className='grid grid-cols-[auto_1fr] lg:grid-cols-[2fr_1fr] 3xl:grid-cols-[3fr_1fr] gap-16 p-16 h-auto items-start'
            >
                <aside
                    data-label='drawer-container'
                    className={twMerge(
                        'w-56 ml-[-16px] flex flex-col h-[80vh] sticky top-16',
                        ' lg:ml-0 lg:w-full lg:order-2'
                    )}
                >
                    <FilterVisits
                        handleVisitsFilter={(e) => handleVisitsFilter(e)}
                        visitsList={visitsList}
                        className='hidden lg:flex'
                    />
                </aside>

                <section
                    data-label='places-container'
                    className={twMerge(
                        'grid grid-cols-1 3xl:grid-cols-2',
                        'grid-flow-row-dense gap-16 w-full',
                        'lg:order-1'
                    )}
                >
                    {visitsList
                        .sort((a, b) => {
                            const aDate = a.date;
                            const bDate = b.date;

                            if (aDate > bDate) return -1;
                            if (aDate < bDate) return 1;
                            return 0;
                        })
                        .map((visit) => {
                            return (
                                <VisitCard
                                    visit={visit}
                                    key={visit._id}
                                />
                            );
                        })}
                </section>
            </div>
        </>
    );
};
