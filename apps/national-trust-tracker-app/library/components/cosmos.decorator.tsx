'use client';

import React, { ReactNode, ReactElement } from 'react';

export default ({ children }: { children: ReactNode | ReactElement }) => (
    <div className='h-screen bg-slate-100 p-16'>{children}</div>
);
