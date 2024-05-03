// MARK: Types

import { twMerge } from '../../../utilities/twMerge.util';
import { Badge, BadgeProps } from '../../Badge/Badge.component';
import { Icon, IconProps } from '../../Icon';
import { Tooltip, TooltipProps } from '../../Tooltip/Tooltip.component';

// MARK: Types

interface LabelTooltip extends Omit<TooltipProps, 'children'> {
    status: 'info' | 'warning';
}

export type LabelProps = {
    addBadge?: BadgeProps[];
    className?: string;
    display?: 'stack' | 'linear';
    hideBadge?: boolean;
    htmlFor: string;
    isRequired: boolean;
    label?: string;
    tooltips?: LabelTooltip[];
};

// MARK: Label

export const Label = ({
    addBadge,
    className,
    display = 'linear',
    hideBadge,
    htmlFor,
    isRequired,
    label,
    tooltips,
    ...props
}: LabelProps) => {
    // MARK: Return

    return (
        <div
            data-label='label'
            className={twMerge(
                'grid grid-cols-auto grid-rows-auto gap-x-8 w-fit',
                className
            )}
        >
            <label
                className={twMerge(
                    'row-start-1 ',
                    display === 'linear'
                        ? 'col-span-1'
                        : hideBadge
                          ? 'col-span-1'
                          : 'col-span-20'
                )}
                htmlFor={htmlFor}
                {...props}
            >
                {label}
            </label>

            {!hideBadge && (
                <div
                    className={twMerge(
                        'row-start-1 flex items-center flex-wrap',
                        display === 'linear' ? 'row-start-1' : 'row-start-2'
                    )}
                >
                    <Badge
                        divergent='soft'
                        colorScheme={isRequired ? 'red' : 'blue'}
                    >
                        {isRequired ? 'Required' : 'Optional'}
                    </Badge>
                </div>
            )}
            {addBadge && (
                <div
                    className={twMerge(
                        'flex flex-row content-center flex-wrap',
                        display === 'linear' ? 'row-start-1' : 'row-start-2'
                    )}
                >
                    {addBadge.map((badge) => {
                        return (
                            <Badge
                                divergent='soft'
                                {...badge}
                            />
                        );
                    })}
                </div>
            )}
            {tooltips && tooltips.length > 0 && (
                <div
                    className={twMerge(
                        'flex flex-row row-start-1 items-center flex-wrap gap-8',
                        display === 'linear' || hideBadge
                            ? 'row-start-1'
                            : 'row-start-2'
                    )}
                >
                    {tooltips.map((tooltip) => {
                        const icon: IconProps =
                            tooltip.status === 'info'
                                ? {
                                      className: 'text-gray-600',
                                      icon: 'circle-info',
                                      ariaLabel: 'extra information',
                                  }
                                : {
                                      className: 'text-orange-600',
                                      icon: 'warning',
                                      ariaLabel: 'warning information',
                                  };

                        return (
                            <Tooltip
                                {...tooltip}
                                key={`label-${tooltip.status}-${tooltip.label}`}
                            >
                                <span className='flex flex-row'>
                                    <Icon {...icon} />
                                </span>
                            </Tooltip>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
