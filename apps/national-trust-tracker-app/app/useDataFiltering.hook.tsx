import { useEffect, useState } from 'react';
import { useVisits } from '../library/context/Visits.context';
import { UseFormReturn, useForm } from 'react-hook-form';
import { ReduceMapProps } from '../library/context/Visits.helpers';

// MARK: Types

type FormType = {
    year: string;
    month: string;
};

type OptionsProps = {
    years: string[];
    months: string[];
};

type FiltersProps = {
    year: string;
    month: string;
    type: string;
};

type UseDataFilteringReturn = {
    filters: FiltersProps;
    form: UseFormReturn<FormType, any, undefined>;
    handleDataSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleFilters: (filter: Partial<FiltersProps>) => void;
    options: OptionsProps;
};

// MARK: Hook

export const useDataFiltering = (): UseDataFilteringReturn => {
    const { getStatistics } = useVisits();

    // MARK: State

    const [options, setOptions] = useState<OptionsProps>({
        months: [''],
        years: [''],
    });

    const [filters, setFilters] = useState<FiltersProps>({
        year: '',
        month: '',
        type: '',
    });

    // MARK: Form

    const form = useForm<FormType>({
        mode: 'onChange',
        defaultValues: { month: '', year: '' },
    });

    // MARK: handlers

    const handleDataSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;

        const value = e.target.value;

        if (name === 'month') {
            setFilters((prev) => ({ ...prev, month: value }));
        }

        if (name === 'month' && value && !filters.year) {
            const year = value.split('-')[1]!;
            form.setValue('year', year, { shouldValidate: true });
        }

        if (name === 'year' && value) {
            const months = getMonthOptions(value);
            setFilters((prev) => ({ ...prev, year: value, month: '' }));
            setOptions((prev) => ({ ...prev, months }));
            form.setValue('month', '', { shouldValidate: true });
        }

        if (name === 'year' && !value) {
            const months =
                options.years.length === 1
                    ? getMonthOptions(options.years[0])
                    : [];

            setFilters((prev) => ({ ...prev, month: value, year: value }));
            setOptions((prev) => ({ ...prev, months }));
            form.setValue('month', value, { shouldValidate: true });
        }
    };

    const handleFilters = (filter: Partial<FiltersProps>) => {
        setFilters((prev) => ({
            ...prev,
            ...filter,
        }));
    };

    const getMonthOptions = (year?: string) => {
        const monthStats = getStatistics({ specificity: 'month' }) as Record<
            string,
            ReduceMapProps
        >;

        if (year) {
            return Object.keys(monthStats).filter((month) =>
                month.includes(year)
            );
        }

        if (!year && filters.year) {
            return Object.keys(monthStats).filter((month) =>
                month.includes(filters.year)
            );
        }

        return [];
    };

    // MARK: Effects

    useEffect(function init() {
        const yearStats = getStatistics({ specificity: 'year' }) as Record<
            string,
            ReduceMapProps
        >;

        const years = Object.keys(yearStats);

        const months = years.length === 1 ? getMonthOptions(years[0]) : [];

        setOptions((prev) => ({
            ...prev,
            years,
            months,
        }));
    }, []);

    // MARK: Return

    return { options, filters, handleDataSelect, handleFilters, form };
};
