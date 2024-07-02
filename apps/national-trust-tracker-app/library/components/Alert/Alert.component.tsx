import { twMerge } from '../../utilities/twMerge.util';
import { Icon, IconProps } from '../Icon';
import { AlertStyles, alertStyles } from './Alert.styles';

type AlertStatus = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps extends Omit<AlertStyles, 'colorScheme'> {
    className?: string;
    description?: string;
    heading: string;
    status: AlertStatus;
}

// MARK: Component

export const Alert = ({
    className,
    description,
    divergent = 'soft',
    heading,
    status,
}: AlertProps) => {
    console.log('description: ', description);
    const styles = alertStyles({
        divergent,
        colorScheme: resolveColorScheme(status),
        className,
    });

    return (
        <div
            data-label='alert'
            className={twMerge(styles)}
        >
            <div
                data-label='alert-heading'
                className='flex flex-row gap-8 items-center'
            >
                <Icon {...resolveIcon(status)} />
                <p className='font-bold'>{heading}</p>
            </div>
            <div>{description}</div>
        </div>
    );
};

// MARK: Resolve Functions

const resolveIcon = (status: AlertStatus): IconProps => {
    switch (status) {
        case 'error':
            return { icon: 'circle-cross', ariaLabel: 'error' };
        case 'info':
            return { icon: 'circle-info', ariaLabel: 'info' };
        case 'success':
            return { icon: 'circle-tick', ariaLabel: 'success' };
        case 'warning':
            return { icon: 'warning', ariaLabel: 'warning' };
    }
};

const resolveColorScheme = (
    status: AlertStatus
): AlertStyles['colorScheme'] => {
    switch (status) {
        case 'error':
            return 'red';
        case 'info':
            return 'blue';
        case 'success':
            return 'green';
        case 'warning':
            return 'yellow';
    }
};
