'use client';

import { useState } from 'react';

import { useFixtureSelect } from 'react-cosmos/client';

import { Button } from '../Button';

import { Toaster, ToasterProps } from './Toaster.component';
import { useToast } from './useToast.hook';
import { ToastProps } from './Toast.component';

const divergents: Exclude<
    ToasterProps['toasts'][0]['divergent'],
    undefined | null
>[] = ['outline', 'soft', 'solid', 'accent'];

const positions: Exclude<
    ToasterProps['toasts'][0]['position'],
    undefined | null
>[] = ['top', 'top-left', 'top-right'];

const ToastFixture = () => {
    const { toast, toasts } = useToast();

    const [count, setCount] = useState<number>(1);

    // MARK: Inputs

    const [divergent] = useFixtureSelect('Divergent', {
        options: divergents,
        defaultValue: 'soft',
    });
    const [position] = useFixtureSelect('Position', {
        options: positions,
        defaultValue: 'top',
    });

    // MARK: Handlers

    const handleToast = (status: ToastProps['status']) => {
        toast({
            title: `${status.toCapitalisedCase()} Toast ${count}`,
            status: status,
            description: `I am a basic ${status} toast`,
            divergent,
            position,
        });
        setCount((prev) => prev + 1);
    };

    return (
        <>
            <div className='p-16 flex flex-row h-full w-full justify-center items-center'>
                <div className='grid grid-cols-3 grid-rows-3'>
                    <Button
                        icon={{ icon: 'plus', ariaLabel: 'add' }}
                        colorScheme={'red'}
                        onClick={() => handleToast('error')}
                        className='row-start-1 col-start-1'
                    />
                    <Button
                        icon={{ icon: 'plus', ariaLabel: 'add' }}
                        colorScheme={'green'}
                        onClick={() => handleToast('success')}
                        className='row-start-1 col-start-3'
                    />
                    <Button
                        icon={{ icon: 'plus', ariaLabel: 'add' }}
                        colorScheme={'blue'}
                        onClick={() => handleToast('info')}
                        className='row-start-3 col-start-1'
                    />
                    <Button
                        icon={{ icon: 'plus', ariaLabel: 'add' }}
                        colorScheme={'orange'}
                        onClick={() => handleToast('warning')}
                        className='row-start-3 col-start-3'
                    />
                    <Button
                        icon={{ icon: 'cross', ariaLabel: 'close' }}
                        onClick={() => toast.closeAll()}
                        className='row-start-2 col-start-2'
                    />
                </div>
            </div>
            <Toaster toasts={toasts} />
        </>
    );
};

export default ToastFixture;
