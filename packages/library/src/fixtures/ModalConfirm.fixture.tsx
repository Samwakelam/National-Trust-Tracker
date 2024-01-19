/* eslint-disable react-hooks/rules-of-hooks */
// Note: React must be declared in all files for cosmos to work
import React, { useState } from 'react';

// Note: Full paths must be used in all files for cosmos to work
import {
    Button,
    FixtureBox,
    ModalConfirm,
    ModalConfirmProps,
    SelectGroup,
} from '../components';
import { useForm } from 'react-hook-form';

const ModalConfirmFixture = ({
    isOpen,
    onClose,
    children,
}: Pick<ModalConfirmProps, 'isOpen' | 'onClose' | 'children'>) => {
    return (
        <ModalConfirm
            onClose={onClose}
            isOpen={isOpen}
            confirmCTA={{
                children: 'Confirm',
                onClick: () => alert('confirm has been clicked'),
            }}
        >
            {children}
        </ModalConfirm>
    );
};

// Flickering in fixture stopping UI controls from working correctly It seems to be Chakra's modal that's causing the issue

export default {
    'Always open': () => {
        return (
            <ModalConfirmFixture
                isOpen={true}
                onClose={() => alert('onClose has been called')}
            />
        );
    },
    'With Trigger': () => {
        const [isOpen, setIsOpen] = useState<boolean>(false);

        return (
            <FixtureBox hasPadding>
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                <ModalConfirmFixture
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </FixtureBox>
        );
    },
    'With Children': () => {
        const [isOpen, setIsOpen] = useState<boolean>(true);

        const {
            register,
            formState: { errors },
        } = useForm<any>({ mode: 'onChange' });

        const options = ['Option - 1', 'Option - 2', 'Option - 3'];

        return (
            <FixtureBox hasPadding>
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                <ModalConfirmFixture
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <SelectGroup<any, string>
                        formRegister={{ register }}
                        errors={errors}
                        name='test'
                        label='Child Element'
                        options={options}
                    />
                </ModalConfirmFixture>
            </FixtureBox>
        );
    },
};
