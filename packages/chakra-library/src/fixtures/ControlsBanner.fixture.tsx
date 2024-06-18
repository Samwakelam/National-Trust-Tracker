// Note: React must be declared in all files for cosmos to work
import React, { useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { Button, FrameControlsBanner, FixtureBox } from '../components';

import * as Chakra from '@chakra-ui/react';

const ControlsBannerFixture = () => {
    const [slug] = useValue<boolean>('Add Slug', { defaultValue: false });

    const [btnCount, setBtnCount] = useState<number>(2);

    const buttons = useMemo(() => {
        return Array.from({ length: btnCount }, (_, index) => (
            <Button
                key={index}
                onClick={() => alert('Button Clicked')}
            >
                Button
            </Button>
        ));
    }, [btnCount]);

    const handleButtons = (action: 'add' | 'remove') => {
        if (action === 'add') {
            setBtnCount((prev) => prev + 1);
        }

        if (action === 'remove' && btnCount > 0) {
            setBtnCount((prev) => prev - 1);
        }
    };

    return (
        <BrowserRouter>
            <FixtureBox>
                <FrameControlsBanner
                    id='test'
                    link={slug ? { href: '.', as: Chakra.Link } : undefined}
                >
                    {buttons}
                </FrameControlsBanner>

                <Chakra.Flex
                    justifyContent='space-evenly'
                    direction='row'
                    alignItems='flex-end'
                    flex={1}
                    gap='1rem'
                    p='1rem'
                >
                    <Button onClick={() => handleButtons('add')}>
                        Add Button
                    </Button>
                    <Button onClick={() => handleButtons('remove')}>
                        Remove Button
                    </Button>
                </Chakra.Flex>
                <Chakra.Text p='1rem'>
                    You may need to resize the window between breakpoints to see
                    the changes after removing buttons.
                </Chakra.Text>
            </FixtureBox>
        </BrowserRouter>
    );
};

export default ControlsBannerFixture;
