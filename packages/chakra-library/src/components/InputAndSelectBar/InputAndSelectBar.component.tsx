import React, { Children, ReactElement } from 'react';

import { Button, ButtonProps, InputGroupProps, SelectGroupProps } from '..';

import * as Chakra from '@chakra-ui/react';

type ChildType =
    | ReactElement<InputGroupProps<any>>
    | ReactElement<SelectGroupProps<any, string>>;

type InputAndSelectBarProps = {
    children: ChildType[] | ChildType;
    submitCTA?: ButtonProps;
};

export const InputAndSelectBar = ({
    children,
    submitCTA,
}: InputAndSelectBarProps): ReactElement<InputAndSelectBarProps> => {
    const isSingleItem = Children.toArray(children).length === 1 && !submitCTA;

    const styles = Chakra.useStyleConfig('InputAndSelectBar', {
        variant: undefined,
        isSingleItem,
    });

    return (
        <Chakra.Box
            __css={styles}
            data-label='InputAndSelectBar'
        >
            {children}
            {submitCTA && (
                <Button
                    type='submit'
                    variant='solid'
                    colorScheme='white'
                    {...submitCTA}
                />
            )}
        </Chakra.Box>
    );
};
