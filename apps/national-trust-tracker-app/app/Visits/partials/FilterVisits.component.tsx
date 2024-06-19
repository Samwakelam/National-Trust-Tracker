import { useForm } from 'react-hook-form';

import { InputGroup, SelectGroup } from '../../../library/components';
import { RegionType, regionType } from '../../../library/types/national-trust';
import { twMerge } from '../../../library/utilities/twMerge.util';
import { VisitDB } from '../../../library/types/internal';

// MARK: Types

type FilterVisitsProps = {
    handleVisitsFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    visitsList: VisitDB[];
    className?: string;
};

type Form = {
    name: string;
    dateFrom: string;
    dateTo: string;
    region: string;
};

// MARK: Filter Places

export const FilterVisits = ({
    handleVisitsFilter,
    visitsList,
    className,
}: FilterVisitsProps) => {
    // MARK: Form

    const {
        register,
        formState: { errors },
    } = useForm<Form>({ mode: 'onChange' });

    // MARK: Return

    return (
        <div
            data-label='filter-places'
            className={twMerge('w-full flex flex-col p-16', className)}
        >
            <InputGroup<Form>
                name='name'
                label='Search Visits Name'
                formRegister={{
                    register,
                    options: {
                        onChange: (e) => handleVisitsFilter(e),
                    },
                }}
                errors={errors}
                placeholder='Enter Property Name'
            />

            <InputGroup<Form>
                name='dateFrom'
                label='From'
                formRegister={{
                    register,
                    options: {
                        onChange: (e) => handleVisitsFilter(e),
                    },
                }}
                errors={errors}
                type='date'
                labelConfig={{ hideBadge: true }}
            />

            <InputGroup<Form>
                name='dateTo'
                label='To'
                formRegister={{
                    register,
                    options: {
                        onChange: (e) => handleVisitsFilter(e),
                    },
                }}
                errors={errors}
                type='date'
                labelConfig={{
                    hideBadge: true,
                }}
            />
            <SelectGroup<Form, RegionType>
                name='region'
                label='Search By Region'
                formRegister={{
                    register,
                    options: {
                        onChange: (e) => handleVisitsFilter(e),
                    },
                }}
                errors={errors}
                labelConfig={{ hideBadge: true }}
                options={regionType.map((region) => region)}
            />

            <p className=''>{`Showing ${visitsList.length} ${visitsList.length === 1 ? 'visit' : 'visits'}`}</p>
        </div>
    );
};
