# Bar FLoating

A bar that has a `fixed` position. It will sit on the page as a circular plus button icon and will expand when clicked.

The floating bar is made from our own Bar component and manipulates the css variables instead of having it's own styling file.

## Props

Extends Chakra's Box Props

| Props       | Required | Type                                                    | Description                                                            | Default            |
| ----------- | -------- | ------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------ | --- |
| buttonIcon  | `false`  | { open?: IconProps['icon']; close?: IconProps['icon'] } | Set a custom icon for the button in both menu open and closed scenario |                    |
| children    | `true`   | ReactElement                                            | ReactElement[]                                                         | Content of the Bar |     |
| colorScheme | `false`  | Chakra.StyleFunctionProps['colorScheme']                | Chakra's colorScheme system                                            |
| gap         | `false`  | Chakra.ResponsiveValue<Property.Gap<Length>>            | Specifies the flex gap between elements                                |                    |
