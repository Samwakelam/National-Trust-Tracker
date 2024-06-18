// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import {
    Accordion,
    AccordionProps,
    ButtonProps,
    FixtureBox,
    Lorem,
} from '../components';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const variants: ButtonProps['variant'][] = [
    'ghost',
    'gradient',
    'outline',
    'raised',
    'solid',
    'unstyled',
];

const AccordionFixture = ({
    items,
}: Omit<AccordionProps, 'uniqueIdentifier'>) => {
    const [allowToggle] = useValue<boolean>('allowToggle', {
        defaultValue: true,
    });

    const [allowMultiple] = useValue<boolean>('allowMultiple', {
        defaultValue: false,
    });

    const [variant] = useSelect('Button Variant', {
        options: variants as string[],
        defaultValue: 'solid',
    });

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'gray',
    });

    return (
        <FixtureBox hasPadding>
            <Accordion
                items={items}
                uniqueIdentifier='AccordionFixture'
                allowMultiple={allowMultiple}
                allowToggle={allowToggle}
                variant={variant}
                colorScheme={scheme}
            />
        </FixtureBox>
    );
};

export default {
    'Multiple Items': () => {
        const items: AccordionProps['items'] = [
            [{ text: 'Title 1' }, { children: <Lorem /> }],
            [{ text: 'Title 2' }, { children: <Lorem /> }],
            [{ text: 'Title 3' }, { children: <Lorem /> }],
        ];

        return <AccordionFixture items={items} />;
    },
    'Single Item': () => {
        const items: AccordionProps['items'] = [
            [{ text: 'Only Item' }, { children: <Lorem /> }],
        ];

        return <AccordionFixture items={items} />;
    },
};
