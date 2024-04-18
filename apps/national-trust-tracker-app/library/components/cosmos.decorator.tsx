'use client';

import React, { ReactNode, ReactElement } from 'react';

export default ({ children }: { children: ReactNode | ReactElement }) => (
    <div className='h-full bg-zinc-100 p-16'>{children}</div>
);
