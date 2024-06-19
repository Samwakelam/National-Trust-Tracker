import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { InputGroup } from '../../../library/components';
import { PlaceSummary } from '../../../library/types/national-trust';
import { twMerge } from '../../../library/utilities/twMerge.util';

// MARK: Types

type FilterPlacesProps = {
    handlePropertyFilter: (name: string) => void;
    propertyList: PlaceSummary[];
    className?: string;
};

type Form = { name: string };

// MARK: Filter Places

export const FilterPlaces = ({
    handlePropertyFilter,
    propertyList,
    className,
}: FilterPlacesProps) => {
    // MARK: Form

    const {
        register,
        formState: { errors },
        watch,
    } = useForm<Form>({ mode: 'onChange' });

    // MARK: Effects

    useEffect(() => {
        const name = watch('name');

        handlePropertyFilter(name);
    }, [watch('name')]);

    return (
        <div
            data-label='filter-places'
            className={twMerge('w-full flex flex-col p-16', className)}
        >
            <InputGroup<any>
                name='name'
                label='Search Property Name'
                formRegister={{ register }}
                errors={errors}
            />
            <p className=''>{`Showing ${propertyList.length} ${propertyList.length === 1 ? 'property' : 'properties'}`}</p>
        </div>
    );
};
