# Button

A Button component.

-   Extends the Chakra button component.
-   Can configure a tooltip.
-   See the [Chakra Docs](https://chakra-ui.com/docs/components/button/usage) for Props you can pass.

## Icon Button

You can pass an icon to the button as a config which extends the IconProps and adds `position` as an optional prop.

If you do not specify a position the icon will be added to the left of the button children.

If you do not pass any children to the button but specify an Icon you will have a [Chakra IconButton](https://chakra-ui.com/docs/components/icon-button/usage) returned.

## Tooltip

You can include a tooltip with the button for extra guidance. Pass tooltip as a config to the button component and it will wrap your button in a [Chakra Tooltip](https://chakra-ui.com/docs/components/tooltip/usage).

## Props

| Props   | Required | Type                             | Description                                                             | Default |
| ------- | -------- | -------------------------------- | ----------------------------------------------------------------------- | ------- |
| icon    | `false`  | ButtonIconProps                  | Set up for the icon                                                     |         |
| tooltip | `false`  | Omit<C.TooltipProps, 'children'> | Adds a tooltip to the button if required. Useful for Icon only buttons. |         |

## Todo

-   Remove styled components
