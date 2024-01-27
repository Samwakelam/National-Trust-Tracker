import { ReactElement } from 'react';

export type Children =
    | ReactElement
    | (ReactElement | undefined | false | null)[]
    | false
    | null;
