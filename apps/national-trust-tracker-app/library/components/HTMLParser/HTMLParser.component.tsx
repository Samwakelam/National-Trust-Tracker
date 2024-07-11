'use-client';

import React, { ReactElement } from 'react';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';
import { twMerge } from '../../utilities/twMerge.util';

export type HtmlParserProps = {
    htmlString: string;
    align?: 'left' | 'center' | 'right';
};

export const HtmlParser = ({
    htmlString,
    align = 'center',
}: HtmlParserProps): ReactElement<HtmlParserProps> => {
    const options: HTMLReactParserOptions = {
        replace(node) {
            if (node.type === 'tag') {
                switch (node.name) {
                    case 'a':
                        console.log('node.attribs.href : ', node.attribs.href);
                        return (
                            <a
                                className='font-bold contents'
                                target='_blank'
                                href={node.attribs.href || undefined}
                                // {...node.attribs}
                            >
                                {/* @ts-ignore */}
                                {domToReact(node.children, options)}
                            </a>
                        );
                    case 'p':
                        return (
                            <p>
                                {/* @ts-ignore */}
                                {domToReact(node.children, options)}
                            </p>
                        );
                    case 'ul':
                        return (
                            <ul
                                className={twMerge(
                                    align === 'left' && 'list-disc pl-24'
                                )}
                            >
                                {/* @ts-ignore */}
                                {domToReact(node.children, options)}
                            </ul>
                        );
                    case 'li':
                        // @ts-ignore
                        return (
                            <li>
                                {/* @ts-ignore */}
                                {domToReact(node.children, options)}
                            </li>
                        );
                }
            }

            return node;
        },
    };

    return (
        <div
            data-label='html-parser'
            className={twMerge(
                'flex flex-col gap-8 max-w-800 items-center',
                resolveAlignment(align)
            )}
        >
            {parse(htmlString, options)}
        </div>
    );
};

const resolveAlignment = (align: HtmlParserProps['align']): string => {
    switch (align) {
        case 'center':
            return 'text-center';
        case 'left':
            return 'text-left';
        case 'right':
            return 'text-right';
        default:
            return 'text-center';
    }
};
