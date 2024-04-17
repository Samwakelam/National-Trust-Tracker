import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
    Card,
    Heading,
    Icon,
    InputGroup,
    Modal,
    ModalProps,
} from '@sam/library';

import { Visit } from '../../types/internal';
import {
    getAmountInPence,
    getAmountInPounds,
    resolveCurrency,
    resolveIcon,
    resolvePersonMap,
} from '../../helpers';

import { resolveAssetMap } from './VisitCard.helpers';

import * as Chakra from '@chakra-ui/react';

interface VisitCardModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {
    visit: Visit;
}

type Form = Omit<Visit, '_id'>;

export const VisitCardModal = ({
    isOpen,
    onClose,
    visit,
}: VisitCardModalProps) => {
    const [editEnabled, setEditEnabled] = useState<boolean>(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = useForm<Form>({ mode: 'onChange' });

    const handleCancel = () => {
        setEditEnabled(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={new Date(visit.date).toDateString()}
            size='lg'
        >
            <Heading preset='modal-heading'>{visit.place.name}</Heading>

            <Card
                heading={{ preset: 'sub-heading', children: 'Tickets' }}
                colorScheme='gray'
                variant='outline'
                hasNegativeMargin
            >
                <Chakra.Flex>
                    <Chakra.Text>
                        {visit.people.map(resolvePersonMap)}
                    </Chakra.Text>
                </Chakra.Flex>
                {visit.tickets.map((ticket, index) => {
                    return (
                        <Chakra.Flex
                            key={`ticket-${ticket.name}`}
                            justifyContent='space-between'
                            gap={16}
                        >
                            <Chakra.Flex gap={8}>
                                <Chakra.Text as='b'>{ticket.name}</Chakra.Text>
                                <Chakra.Text>{ticket.qty}</Chakra.Text>
                            </Chakra.Flex>
                            <Chakra.Flex gap={8}>
                                <Chakra.Text>
                                    {resolveCurrency(
                                        ticket.standardAmount.currency
                                    )}
                                </Chakra.Text>

                                <Chakra.Text>
                                    {getAmountInPounds(
                                        ticket.standardAmount.amount
                                    )}
                                </Chakra.Text>

                                <Chakra.Text>each</Chakra.Text>
                            </Chakra.Flex>
                        </Chakra.Flex>
                    );
                })}
            </Card>
            <Card
                heading={{
                    preset: 'sub-heading',
                    children: 'Facilities Used',
                }}
                colorScheme='gray'
                variant='outline'
                hasNegativeMargin
            >
                {visit.facilitiesUsed.map((facility) => {
                    const icon = resolveIcon(facility.reference);

                    return (
                        <Chakra.Flex
                            key={`facility-${facility.reference}`}
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
                    );
                })}
            </Card>
            <Card
                heading={{
                    preset: 'sub-heading',
                    children: 'Assets Used',
                }}
                colorScheme='gray'
                variant='outline'
                hasNegativeMargin
            >
                {visit.assetsUsed.map(resolveAssetMap)}
            </Card>
            <Card
                heading={{
                    preset: 'sub-heading',
                    children: 'Travelled By:',
                }}
                colorScheme='gray'
                variant='outline'
                hasNegativeMargin
            >
                {visit.travel.map((vehicle) => {
                    const icon = resolveIcon(vehicle);

                    return (
                        <Chakra.Flex
                            key={`facility-${vehicle}`}
                            gap={8}
                            alignItems='center'
                        >
                            {icon && <Icon {...icon} />}

                            <Chakra.Text
                                display='flex'
                                flexDirection='row'
                                as='b'
                            >
                                {vehicle.toCapitalisedCase()}
                            </Chakra.Text>
                        </Chakra.Flex>
                    );
                })}
            </Card>
        </Modal>
    );
};
