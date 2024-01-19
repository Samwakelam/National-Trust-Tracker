import React from 'react';

import { Icon } from '..';

import { AccordionItemProps, AccordionProps } from './Accordion.definition';

import * as Chakra from '@chakra-ui/react';

const [StylesProvider, useStyles] = Chakra.createStylesContext('Accordion');

export const Accordion = ({
    colorScheme,
    allowMultiple = false,
    allowToggle = true,
    items,
    size,
    uniqueIdentifier,
    variant,
}: AccordionProps) => {
    const numberItems = items.length;
    const styles = Chakra.useMultiStyleConfig('Accordion', { size, variant });

    return (
        <StylesProvider value={styles}>
            <Chakra.Accordion
                allowMultiple={allowMultiple}
                allowToggle={allowToggle}
                key={`accordion-container-${uniqueIdentifier}`}
                data-label='accordion-root'
                data-is-single-item={numberItems === 1}
                variant={variant}
                colorScheme={colorScheme}
            >
                {items.map(([item, panel], index) => {
                    return (
                        <Chakra.AccordionItem
                            key={`accordion-item-${item.text}-${index}`}
                            data-label='accordion-container'
                        >
                            <Chakra.AccordionButton>
                                <AccordionTitle
                                    text={item.text}
                                    icon={item.icon}
                                />
                                <Chakra.AccordionIcon />
                            </Chakra.AccordionButton>

                            <Chakra.AccordionPanel>
                                {panel.children}
                            </Chakra.AccordionPanel>
                        </Chakra.AccordionItem>
                    );
                })}
            </Chakra.Accordion>
        </StylesProvider>
    );
};

const AccordionTitle = ({
    icon,
    text,
}: Pick<AccordionItemProps, 'icon' | 'text'>) => {
    const styles = useStyles();
    return (
        <Chakra.Flex
            __css={styles.title}
            data-label='accordion-title'
        >
            {icon && (icon.position === 'left' || !icon.position) && (
                <Icon {...icon} />
            )}
            <Chakra.Heading as='h3'>{text}</Chakra.Heading>
            {icon && icon.position === 'right' && <Icon {...icon} />}
        </Chakra.Flex>
    );
};
