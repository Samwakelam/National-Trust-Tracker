import { Link } from './link.type';

export type AccessTag = {
    reference: string;
    name: string;
    description: string;
};

export type Access = {
    tags: AccessTag[];
    resourceType: string;
    links: Link[];
};
