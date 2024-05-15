export type LinkProps = {
    href: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    download?: boolean;
    rel?: 'external';
};
