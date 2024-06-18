/* eslint-disable no-useless-computed-key */

// Note: React must be declared in all files for cosmos to work
import React from 'react';

// Note: Full paths must be used in all files for cosmos to work
import { ButtonPreset, ButtonPresetProps, FixtureBox } from '../components';

import * as Chakra from '@chakra-ui/react';

const ButtonPresetFixture = ({ preset }: Pick<ButtonPresetProps, 'preset'>) => {
    return (
        <>
            <Chakra.Heading
                as='h6'
                size={'sm'}
                color='gray.300'
            >
                {preset.toLocaleLowerCase()}
            </Chakra.Heading>

            <Chakra.Flex
                direction='row'
                gap={16}
                mb={16}
            >
                <ButtonPreset preset={preset} />
                <ButtonPreset
                    preset={preset}
                    isLoading={true}
                />
                <ButtonPreset
                    preset={preset}
                    isDisabled={true}
                />
            </Chakra.Flex>
        </>
    );
};

export default () => {
    return (
        <FixtureBox hasPadding>
            <ButtonPresetFixture preset='add' />
            <ButtonPresetFixture preset='cancel' />
            <ButtonPresetFixture preset='delete' />
            <ButtonPresetFixture preset='edit' />
            <ButtonPresetFixture preset='save' />
        </FixtureBox>
    );
};
