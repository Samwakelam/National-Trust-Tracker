import type { Metadata } from 'next';

import { Providers } from './providers';

import '../library/prototypes/String.extensions';
import '../library/global.css';
import { scrollbar } from '../library/utilities/className.utils';
import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const metadata: Metadata = {
    title: 'National Trust Tracker App',
    description: "Sam and Dave's Life Membership",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang='en'
            style={{ margin: '0', height: '100%', overflow: ' hidden' }}
        >
            <body
                style={{
                    margin: '0',
                    height: '100%',
                    overflow: ' hidden',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Providers>
                    <div
                        data-label='header'
                        className='flex flex-row bg-blue-100 border-2 border-solid border-blue-200 w-full'
                    >
                        <div
                            data-label='menu-button'
                            className='w-32 h-full bg-blue-200 border-blue-200 border-solid hover:bg-blue-100'
                        ></div>
                        <div
                            data-label='content'
                            className='flex flex-row gap-8 p-16'
                        >
                            I am a basic bar
                        </div>
                    </div>
                    <main
                        className={clsx(
                            'flex flex-col w-full h-full overflow-y-auto bg-slate-100',
                            scrollbar
                        )}
                    >
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
