import { Link } from './link.type';

export type NoteCategory = {
    name: string;
    htmlNotes: string[];
};

export type Notes = {
    noteCategories: NoteCategory[];
    links: Link[];
};
