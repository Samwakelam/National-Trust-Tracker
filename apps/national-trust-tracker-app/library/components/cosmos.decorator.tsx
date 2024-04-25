'use client';

import React, { ReactNode, ReactElement } from 'react';

export default ({ children }: { children: ReactNode | ReactElement }) => (
    <div className='min-h-full bg-slate-100'>{children}</div>
);
