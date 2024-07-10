import { Icon } from '../Icon';

import { SpinnerStyle, spinnerStyles } from './Spinner.styles';

export interface SpinnerProps extends SpinnerStyle {
    className?: string;
}

export const Spinner = ({ className, colorScheme, size }: SpinnerProps) => {
    const styles = spinnerStyles({ colorScheme, size, className });

    return (
        <Icon
            icon='spinner'
            ariaLabel='spinner'
            className={styles}
        />
    );
};
