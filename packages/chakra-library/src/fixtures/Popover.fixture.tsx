import React, { useRef } from 'react';

import { Button, FixtureBox, Lorem, Popover } from '../components';

import * as Chakra from '@chakra-ui/react';

export const PopoverFixture = () => {
    return (
        <FixtureBox hasPadding>
            <Popover
                body={
                    <Chakra.Text>
                        <Lorem />
                    </Chakra.Text>
                }
            >
                <Button>Trigger</Button>
            </Popover>
        </FixtureBox>
    );
};

export default PopoverFixture;
