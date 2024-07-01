type CreateIconProps = {
    /**
     * The icon `svg` viewBox
     * @default "0 0 24 24"
     */
    viewBox?: string;
    /**
     * The `svg` path or group element
     * @type React.ReactElement | React.ReactElement[]
     */
    path?: React.ReactElement | React.ReactElement[];

    /**
     * The display name useful in the dev tools
     */
    displayName?: string;
};

export const createIcon = ({
    viewBox = '0 0 24 24',
    path,
    displayName,
}: CreateIconProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox={viewBox}
        >
            <title>{displayName}</title>
            {path}
        </svg>
    );
};
