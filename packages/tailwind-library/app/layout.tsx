import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { scrollbar } from '../library/utilities/className.utils';
import { twMerge } from '../library/utilities/twMerge.util';

import '../library/prototypes/String.extensions';
import '../library/global.css';

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
                <main
                    className={twMerge(
                        'flex flex-col w-full h-full overflow-y-auto bg-slate-100',
                        scrollbar
                    )}
                >
                    {children}
                </main>
            </body>
        </html>
    );
}
