import { IconType } from 'react-icons';
import {
    BsFileEarmarkCheckFill,
    BsFileEarmarkFill,
    BsFileEarmarkCheck,
    BsFileEarmark,
    BsFiletypeCsv,
    BsFiletypeJson,
} from 'react-icons/bs';
import { HiArchiveBox, HiOutlineArchiveBox } from 'react-icons/hi2';
import {
    LuMail,
    LuMailCheck,
    LuMailMinus,
    LuMailOpen,
    LuMailPlus,
    LuMailQuestion,
    LuMailSearch,
    LuMailWarning,
    LuMailX,
} from 'react-icons/lu';

export type FilesType =
    | 'archive'
    | 'file'
    | 'file-csv'
    | 'file-done'
    | 'file-json'
    | 'mail'
    | 'mail-add'
    | 'mail-cross'
    | 'mail-open'
    | 'mail-remove'
    | 'mail-search'
    | 'mail-tick'
    | 'mail-unknown'
    | 'mail-warning';

export const filesOutlineMap: { [key in FilesType]: IconType } = {
    'archive': HiOutlineArchiveBox,
    'file': BsFileEarmark,
    'file-csv': BsFiletypeCsv,
    'file-done': BsFileEarmarkCheck,
    'file-json': BsFiletypeJson,
    'mail': LuMail,
    'mail-add': LuMailPlus,
    'mail-cross': LuMailX,
    'mail-open': LuMailOpen,
    'mail-remove': LuMailMinus,
    'mail-search': LuMailSearch,
    'mail-tick': LuMailCheck,
    'mail-unknown': LuMailQuestion,
    'mail-warning': LuMailWarning,
};

export const filesSolidMap: { [key in FilesType]: IconType } = {
    'archive': HiArchiveBox,
    'file': BsFileEarmarkFill,
    'file-csv': BsFiletypeCsv,
    'file-done': BsFileEarmarkCheckFill,
    'file-json': BsFiletypeJson,
    'mail': LuMail,
    'mail-add': LuMailPlus,
    'mail-cross': LuMailX,
    'mail-open': LuMailOpen,
    'mail-remove': LuMailMinus,
    'mail-search': LuMailSearch,
    'mail-tick': LuMailCheck,
    'mail-unknown': LuMailQuestion,
    'mail-warning': LuMailWarning,
};
