import { extendTheme } from '@chakra-ui/react';

import { globalStyles } from './global.styles';

import { Accordion } from '../components/Accordion/Accordion.styles';
import { Alert } from '../components/Alert/Alert.styles';
import { Bar } from '../components/Bar/Bar.styles';
import { Button } from '../components/Button/Button.styles';
import { Card } from '../components/Card/Card.styles';
import { Checkbox } from '../components/CheckboxGroup/Checkbox.styles';
import { ContainerScrollBox } from '../components/ContainerScrollBox/ContainerScrollBox.styles';
import { Drawer } from '../components/Drawer/Drawer.styles';
import { Frame } from '../components/Frame/Frame.styles';
import { Input } from '../components/InputGroup/Input.styles';
import { InputAndSelectBar } from '../components/InputAndSelectBar/InputAndSelectBar.styles';
import { Label } from '../components/Label/Label.styles';
import { Modal } from '../components/Modal/Modal.styles';
import { MultiSwitch } from '../components/MultiSwitch/MultiSwitch.styles';
import { Select } from '../components/SelectGroup/Select.styles';
import { SideMenu } from '../components/DrawerSideMenu/SideMenu.styles';
import { Spinner } from '../components/Spinner/Spinner.styles';
import { Switch } from '../components/SwitchGroup/Switch.styles';
import { Tag } from '../components/Tag/Tag.styles';
import { Textarea } from '../components/TextareaGroup/Textarea.styles';

export const space = {
    0: '0',
    1: '0.0625rem',
    2: '0.125rem',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    18: '1.125rem',
    20: '1.25rem',
    24: '1.5rem',
    32: '2rem',
    36: '2.25rem',
    40: '2.5rem',
    44: '2.75rem',
    48: '3rem',
    56: '3.5rem',
    60: '3.75rem',
    64: '4rem',
    80: '5rem',
    88: '5.5rem',
    96: '6rem',
    112: '7rem',
    120: '7.5rem',
    128: '8rem',
    144: '9rem',
    176: '11rem',
    208: '13rem',
    304: '19rem',
    544: '34rem',
};

export const extensions = (_extensions: any) => ({
    styles: {
        global: {
            ...globalStyles,
        },
    },
    sizes: {
        ...space,
    },
    colors: {
        white: {
            50: '#ffffff',
            100: '#fcfcfd',
            200: '#f9fafc',
            300: '#f5f7fa',
            400: '#f2f5f8',
            500: '#eff2f7',
            600: '#ecf0f5',
            700: '#e8edf3',
            800: '#e5ebf2',
            900: '#e2e8f0',
        },
        black: {
            50: '#2d3748',
            100: '#273142',
            200: '#222c3c',
            300: '#1c2737',
            400: '#172131',
            500: '#121c2c',
            600: '#0c1726',
            700: '#051221',
            800: '#000a1c',
            900: '#000000',
        },
    },
    fonts: {
        heading: `Roboto, Arial, sans-serif`,
        body: `Roboto, Arial, sans-serif`,
    },
    fontSizes: {
        small: '0.875rem',
        standard: '1rem',
        large: '1.4rem',
        45: '2.8rem',
        35: '2.2rem',
        32: '2rem',
        25: '1.5rem',
        20: '1.25rem',
        18: '1.13rem',
        16: '1rem',
        14: '0.875rem',
        13: '0.8rem',
        12: '0.75rem',
    },
    lineHeights: {
        small: '1.3rem',
        standard: '1.5rem',
        large: '1.9rem',
        45: '3.125rem',
        35: '2.5rem',
        32: '2.5rem',
        25: '1.9rem',
        20: '1.56rem',
        18: '1.4rem',
        16: '1.3rem',
        14: '1.875',
        13: '1.125rem',
        12: '1rem',
    },
    components: {
        Accordion,
        Alert,
        Bar,
        Button,
        Card,
        Checkbox,
        ContainerScrollBox,
        Drawer,
        Frame,
        Input,
        InputAndSelectBar,
        Label,
        Modal,
        MultiSwitch,
        Select,
        SideMenu,
        Spinner,
        Switch,
        Tag,
        Textarea,
        ..._extensions.components,
    },
});

const overrides = {
    space,
};

export const defaultTheme = (_extensions: any) => ({
    ...extendTheme(extensions(_extensions)),
    ...overrides,
});

export const useDefaultTheme = (_extensions: any) => {
    return defaultTheme(_extensions);
};
