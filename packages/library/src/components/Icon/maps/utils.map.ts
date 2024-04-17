import { IconType } from 'react-icons';
import {
    BiComment,
    BiCommentAdd,
    BiCommentDetail,
    BiCommentEdit,
    BiCommentX,
    BiDetail,
    BiSolidComment,
    BiSolidCommentAdd,
    BiSolidCommentDetail,
    BiSolidCommentEdit,
    BiSolidCommentX,
    BiSolidDetail,
    BiSolidToggleLeft,
    BiSolidToggleRight,
    BiToggleLeft,
    BiToggleRight,
} from 'react-icons/bi';
import {
    HiDotsHorizontal,
    HiDotsVertical,
    HiMenu,
    HiMenuAlt4,
    HiOutlineLink,
} from 'react-icons/hi';
import {
    IoSettingsOutline,
    IoSettingsSharp,
    IoStatsChart,
    IoStatsChartOutline,
} from 'react-icons/io5';
import {
    RiDeleteBin2Fill,
    RiDeleteBin2Line,
    RiDeleteBin7Fill,
    RiDeleteBin7Line,
    RiDeleteBinFill,
    RiDeleteBinLine,
    RiFileCopyFill,
    RiFileCopyLine,
} from 'react-icons/ri';
import {
    TbArrowBarRight,
    TbArrowBarToDown,
    TbArrowBarToLeft,
    TbArrowBarToUp,
    TbArrowBarUp,
    TbLasso,
    TbLassoPolygon,
} from 'react-icons/tb';
import { FiSearch } from 'react-icons/fi';
import {
    MdEdit,
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdOutlineEdit,
    MdStrikethroughS,
} from 'react-icons/md';
import { LuSettings2 } from 'react-icons/lu';

export type UtilsType =
    | 'bin'
    | 'bin-empty'
    | 'bin-delete'
    | 'comment'
    | 'comment-add'
    | 'comment-delete'
    | 'comment-detail'
    | 'comment-edit'
    | 'copy'
    | 'detail'
    | 'download'
    | 'filter'
    | 'format-bold'
    | 'format-italics'
    | 'format-strikethrough'
    | 'format-underline'
    | 'lasso'
    | 'lasso-poly'
    | 'link'
    | 'login'
    | 'logout'
    | 'menu-dots-h'
    | 'menu-dots-v'
    | 'menu-three'
    | 'menu-two'
    | 'pencil'
    | 'search'
    | 'settings'
    | 'stats'
    | 'toggle-l'
    | 'toggle-r'
    | 'update'
    | 'upload';

export const utilsOutlineMap: { [key in UtilsType]: IconType } = {
    'bin': RiDeleteBinLine,
    'bin-empty': RiDeleteBin7Line,
    'bin-delete': RiDeleteBin2Line,
    'comment': BiComment,
    'comment-add': BiCommentAdd,
    'comment-delete': BiCommentX,
    'comment-detail': BiCommentDetail,
    'comment-edit': BiCommentEdit,
    'copy': RiFileCopyLine,
    'detail': BiDetail,
    'download': TbArrowBarToDown,
    'filter': LuSettings2,
    'format-bold': MdFormatBold,
    'format-italics': MdFormatItalic,
    'format-strikethrough': MdStrikethroughS,
    'format-underline': MdFormatUnderlined,
    'lasso': TbLasso,
    'lasso-poly': TbLassoPolygon,
    'link': HiOutlineLink,
    'login': TbArrowBarToLeft,
    'logout': TbArrowBarRight,
    'menu-dots-h': HiDotsHorizontal,
    'menu-dots-v': HiDotsVertical,
    'menu-three': HiMenu,
    'menu-two': HiMenuAlt4,
    'pencil': MdOutlineEdit,
    'search': FiSearch,
    'settings': IoSettingsOutline,
    'stats': IoStatsChartOutline,
    'toggle-l': BiToggleLeft,
    'toggle-r': BiToggleRight,
    'update': TbArrowBarToUp,
    'upload': TbArrowBarUp,
};

export const utilsSolidMap: { [key in UtilsType]: IconType } = {
    'bin': RiDeleteBinFill,
    'bin-delete': RiDeleteBin2Fill,
    'bin-empty': RiDeleteBin7Fill,
    'comment': BiSolidComment,
    'comment-add': BiSolidCommentAdd,
    'comment-delete': BiSolidCommentX,
    'comment-detail': BiSolidCommentDetail,
    'comment-edit': BiSolidCommentEdit,
    'copy': RiFileCopyFill,
    'detail': BiSolidDetail,
    'download': TbArrowBarToDown,
    'filter': LuSettings2,
    'format-bold': MdFormatBold,
    'format-italics': MdFormatItalic,
    'format-strikethrough': MdStrikethroughS,
    'format-underline': MdFormatUnderlined,
    'lasso': TbLasso,
    'lasso-poly': TbLassoPolygon,
    'link': HiOutlineLink,
    'login': TbArrowBarToLeft,
    'logout': TbArrowBarRight,
    'menu-dots-h': HiDotsHorizontal,
    'menu-dots-v': HiDotsVertical,
    'menu-three': HiMenu,
    'menu-two': HiMenuAlt4,
    'pencil': MdEdit,
    'search': FiSearch,
    'settings': IoSettingsSharp,
    'stats': IoStatsChart,
    'toggle-l': BiSolidToggleLeft,
    'toggle-r': BiSolidToggleRight,
    'update': TbArrowBarToUp,
    'upload': TbArrowBarUp,
};
