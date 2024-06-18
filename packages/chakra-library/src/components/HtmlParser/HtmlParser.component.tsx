//@ts-nocheck
import React, { ReactElement } from 'react';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';

import * as Chakra from '@chakra-ui/react';

export interface HtmlParserProps extends Chakra.FlexProps {
    htmlString: string;
}

export const HtmlParser = ({
    htmlString,
    ...props
}: HtmlParserProps): ReactElement<HtmlParserProps> => {
    const options: HTMLReactParserOptions = {
        replace(node) {
            if (node.type === 'tag') {
                switch (node.name) {
                    case 'p':
                        return (
                            <p data-label='sams p'>
                                {domToReact(node.children, options)}
                            </p>
                        );
                    case 'ul':
                        return (
                            <Chakra.UnorderedList>
                                {domToReact(node.children, options)}
                            </Chakra.UnorderedList>
                        );
                    case 'li':
                        return (
                            <Chakra.ListItem>
                                {/* //@ts-ignore */}
                                {domToReact(node.children, options)}
                            </Chakra.ListItem>
                        );
                }
            }
            return node;
        },
    };

    return (
        <Chakra.Flex
            direction='column'
            gap={8}
            {...props}
        >
            {parse(htmlString, options)}
        </Chakra.Flex>
    );
};
