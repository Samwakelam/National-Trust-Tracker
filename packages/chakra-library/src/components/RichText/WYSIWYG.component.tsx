import React, { ReactElement } from 'react';

import { Button } from '../Button';
import { InlineStyleType } from './RichText.definition';

import * as Chakra from '@chakra-ui/react';

type WYSIWYGProps = {
    handleInlineStyle: (
        e: React.MouseEvent<HTMLButtonElement>,
        inlineStyle: InlineStyleType
    ) => void;
};

export const WYSIWYG = ({
    handleInlineStyle,
}: WYSIWYGProps): ReactElement<WYSIWYGProps> => {
    return (
        <Chakra.Flex
            direction='row'
            gap={8}
        >
            <Button
                icon={{ icon: 'format-bold', ariaLabel: 'bold' }}
                onClick={(e) => handleInlineStyle(e, 'BOLD')}
            />
            <Button
                icon={{ icon: 'format-underline', ariaLabel: 'underline' }}
                onClick={(e) => handleInlineStyle(e, 'UNDERLINE')}
            />
            <Button
                icon={{ icon: 'format-italics', ariaLabel: 'italics' }}
                onClick={(e) => handleInlineStyle(e, 'ITALIC')}
            />
            <Button
                icon={{
                    icon: 'format-strikethrough',
                    ariaLabel: 'strike through',
                }}
                onClick={(e) => handleInlineStyle(e, 'STRIKETHROUGH')}
            />
        </Chakra.Flex>
    );
};
