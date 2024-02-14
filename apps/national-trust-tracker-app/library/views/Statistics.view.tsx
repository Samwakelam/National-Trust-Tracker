'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    ContainerScrollBox,
    ContainerPage,
    Spinner,
    Frame,
    getCase,
    InputGroup,
} from '@sam/library';

import { Visit } from '../types/internal';

import * as Chakra from '@chakra-ui/react';

export type StatisticsViewProps = {
    visits: Visit[];
};

export const StatisticsView = ({ visits }: StatisticsViewProps) => {
    return (
        <ContainerPage>
            <ContainerScrollBox>
                <Frame id='membership-frame'>Statistics</Frame>
            </ContainerScrollBox>
        </ContainerPage>
    );
};
