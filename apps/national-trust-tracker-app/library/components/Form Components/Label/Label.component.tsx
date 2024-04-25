// Mark: Types

export type LabelProps = {
    // addBadge?: Chakra.BadgeProps[];
    display?: 'stack' | 'linear';
    hideBadge?: boolean;
    htmlFor: string;
    isRequired: boolean;
    label?: string;
    // tooltip?: Omit<Chakra.TooltipProps, 'children'>;
    // warning?: Omit<Chakra.TooltipProps, 'children'>;
};
// Mark: Label

// data-label='' className=''

export const Label = ({
    // addBadge,
    display = 'linear',
    hideBadge,
    htmlFor,
    isRequired,
    label,
    // tooltip,
    // warning,
    ...props
}: LabelProps) => {
    // Mark: Return

    return (
        <div className='grid grid-cols-auto grid-rows-auto gap-y-8 w-fit'>
            <div
                className='row-start-1 col-span-1'
                // colSpan={display === 'linear' ? 1 : hideBadge ? 1 : 20}
            >
                <label
                    className=''
                    htmlFor={htmlFor}
                    data-label='Label'
                    {...props}
                >
                    {label}
                </label>
            </div>
            {!hideBadge && (
                <div
                    className='row-start-1 flex items-center flex-wrap'
                    // rowStart={display === 'linear' ? 1 : 2}
                >
                    <div
                        className='text-14'
                        data-label='badge'
                        // colorScheme={isRequired ? 'red' : 'blue'}
                    >
                        {isRequired ? 'Required' : 'Optional'}
                    </div>
                </div>
            )}
            {/* {addBadge && (
                <Chakra.GridItem
                    rowStart={display === 'linear' ? 1 : 2}
                    display='flex'
                    alignContent='center'
                    flexWrap='wrap'
                >
                    {addBadge.map((badge) => {
                        return (
                            <Chakra.Badge
                                __css={styles.badge}
                                fontSize='x-small'
                                variant='subtle'
                                {...badge}
                            />
                        );
                    })}
                </Chakra.GridItem>
            )} */}
            {/* {tooltip && (
                <Chakra.GridItem
                    display='flex'
                    rowStart={display === 'linear' || hideBadge ? 1 : 2}
                    alignContent='center'
                    flexWrap='wrap'
                >
                    <Chakra.Tooltip
                        hasArrow={true}
                        __css={styles.tooltip}
                        {...tooltip}
                    >
                        <Chakra.chakra.span display='flex'>
                            <Icon
                                __css={styles.icon}
                                icon='circle-info'
                                ariaLabel='extra information'
                            />
                        </Chakra.chakra.span>
                    </Chakra.Tooltip>
                </Chakra.GridItem>
            )} */}
            {/* {warning && (
                <Chakra.GridItem
                    display='flex'
                    rowStart={display === 'linear' || hideBadge ? 1 : 2}
                >
                    <Chakra.Tooltip
                        hasArrow={true}
                        __css={styles.tooltip}
                        {...warning}
                    >
                        <Chakra.chakra.span transform='translateY(2px)'>
                            <Icon
                                __css={styles.warning}
                                icon='warning'
                                ariaLabel='warning information'
                            />
                        </Chakra.chakra.span>
                    </Chakra.Tooltip>
                </Chakra.GridItem>
            )} */}
        </div>
    );
};
