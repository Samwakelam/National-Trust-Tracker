import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    Button,
    Card,
    InputGroup,
    Modal,
    Tile,
} from '../../../library/components';
import { getAmountInPence, getAmountInPounds } from '../../../library/helpers';

import { UpdateNationalTrustDataHandlerProps } from './Membership.definitions';
import { ActionResponse } from '../../../library/types';

// MARK: Types

type CardYearProps = {
    year: string | undefined;
    yearSpend: number;
    averageYearSpend: number;
    membershipPrice: number;
    numberOfVisits: number;
    handleSubmit:
        | ((d: UpdateNationalTrustDataHandlerProps) => Promise<ActionResponse>)
        | undefined;
};

type FormValues = { annualMembership: string };

// MARK: Component

export const CardYear = ({
    year,
    yearSpend,
    averageYearSpend,
    membershipPrice,
    numberOfVisits,
    handleSubmit,
}: CardYearProps) => {
    // MARK: State

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // MARK: Form

    const {
        register,
        formState: { errors },
        reset,
        getValues,
    } = useForm<FormValues>({
        mode: 'onChange',
    });

    // MARK: Variables

    const thisYear = new Date().getFullYear().toString();

    // MARK: Handlers

    const handleClose = () => {
        reset();
        setIsModalOpen(false);
    };

    // MARK: Submit

    const onSubmit = async () => {
        const value = getValues('annualMembership');

        if (!handleSubmit) return;

        await handleSubmit({
            collection: 'annualMembership',
            key: year || thisYear,
            value: getAmountInPence(value),
        });

        handleClose();
    };

    // MARK: Effects

    useEffect(() => {
        reset({
            annualMembership: getAmountInPounds(membershipPrice),
        });
    }, [membershipPrice]);

    // MARK: Return

    return (
        <>
            <Card
                colorScheme='white'
                preset='quartered'
                className='w-full'
                heading={year && year !== thisYear ? year : 'This Year'}
            >
                <Tile
                    icon={{
                        icon: 'money',
                        ariaLabel: 'money',
                    }}
                    heading='Spend'
                    description={`£${getAmountInPounds(yearSpend)}`}
                    className='h-full'
                />
                <Tile
                    icon={{
                        icon: 'money-report',
                        ariaLabel: 'money report',
                    }}
                    heading='Average Spend'
                    description={`£${getAmountInPounds(averageYearSpend)}`}
                    className='h-full'
                />
                <Tile
                    icon={{
                        icon: 'membership',
                        ariaLabel: 'membership',
                    }}
                    heading='Annual Membership'
                    description={`£${getAmountInPounds(membershipPrice)}`}
                    className='h-full'
                    onClick={
                        handleSubmit ? () => setIsModalOpen(true) : undefined
                    }
                />
                <Tile
                    icon={{
                        icon: 'ticket',
                        ariaLabel: 'ticket',
                    }}
                    heading='Number of Visits'
                    description={numberOfVisits.toString()}
                    className='h-full'
                />
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => handleClose()}
                heading='National Trust Data'
            >
                <p>{`What is the Annual Membership for ${year || thisYear}? `}</p>
                <InputGroup<FormValues>
                    formRegister={{
                        register,
                    }}
                    errors={errors}
                    name='annualMembership'
                    label='Annual Membership Price'
                    addon={{ left: { children: '£' } }}
                    type='number'
                    step='any'
                    element={{
                        right: {
                            children: (
                                <Button
                                    onClick={() => onSubmit()}
                                    divergent='soft'
                                    size='sm'
                                >
                                    Submit
                                </Button>
                            ),
                        },
                    }}
                />
            </Modal>
        </>
    );
};
