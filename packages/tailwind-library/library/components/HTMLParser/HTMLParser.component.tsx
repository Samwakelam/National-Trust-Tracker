//@ts-nocheck
'use-client';

import React, { ReactElement } from 'react';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';

export type HtmlParserProps = {
    htmlString: string;
};

export const HtmlParser = ({
    htmlString,
}: HtmlParserProps): ReactElement<HtmlParserProps> => {
    const options: HTMLReactParserOptions = {
        replace(node) {
            if (node.type === 'tag') {
                switch (node.name) {
                    case 'a':
                        return (
                            <a
                                className='font-bold contents'
                                target='_blank'
                                href={node.attribs.href}
                                // {...node.attribs}
                            >
                                {domToReact(node.children, options)}
                            </a>
                        );
                    case 'p':
                        return <p>{domToReact(node.children, options)}</p>;
                    case 'ul':
                        return <ul>{domToReact(node.children, options)}</ul>;
                    case 'li':
                        return <li>{domToReact(node.children, options)}</li>;
                }
            }

            return node;
        },
    };

    return (
        <div
            data-label='html-parser'
            className='flex flex-col gap-8 max-w-800 items-center text-center'
        >
            {parse(htmlString, options)}
        </div>
    );
};
