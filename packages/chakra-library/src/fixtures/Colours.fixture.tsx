// Note: React must be declared in all files for cosmos to work
import React from 'react';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox } from '../components';

import * as Chakra from '@chakra-ui/react';

const ColoursFixture = () => {
    const { colors } = Chakra.useTheme();

    const colorsKeys = Object.keys(colors);

    return (
        <FixtureBox hasPadding>
            {colorsKeys.map((color, index) => {
                const colorKeys = Object.keys(colors[color]);

                if (color === 'transparent' || color === 'current') return null;
                return (
                    <Chakra.Flex
                        direction='column'
                        key={`${color}-${index}`}
                        gap='16'
                    >
                        <Chakra.Heading
                            as='h6'
                            size={'sm'}
                        >
                            {color}
                        </Chakra.Heading>
                        <Chakra.Flex
                            direction={'row'}
                            flexWrap='wrap'
                            gap='1rem'
                        >
                            {colorKeys.map((key) => {
                                return (
                                    <Chakra.Flex
                                        direction='column'
                                        key={`${color}-${key}`}
                                        mb='24'
                                    >
                                        <Chakra.Box
                                            h='40'
                                            w={40}
                                            bgColor={`${colors[color][key]}`}
                                            borderRadius='8'
                                        />
                                        <Chakra.Text size='sm'>
                                            {key}
                                        </Chakra.Text>
                                    </Chakra.Flex>
                                );
                            })}
                        </Chakra.Flex>
                    </Chakra.Flex>
                );
            })}
        </FixtureBox>
    );
};

export default ColoursFixture;
