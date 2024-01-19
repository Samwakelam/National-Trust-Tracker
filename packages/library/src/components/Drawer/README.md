# Drawer

A simple slide out drawer container component. Pass in the content you want to configure from the view or component as children.

## Placement

The drawer can be placed Top, Bottom, Left or Right where Right is default.

## Size

You can determine the width of the drawer with the `size` prop. This only works for the left and right placement options. You can pass size to the top and bottom drawers but you will see no effect.

### CTA

-   If you pass in a `confirmCTA` object the `confirm` and `decline` buttons will display in the Drawer footer.
-   You do not have to send any additional settings for the `declineCTA`, the onClick with default to the `onClose` callback and the children defaults to 'Cancel'.
-   If you want to override the `declineCTA` you can pass in ButtonProps
-   The quickest props to change for the Button Colour are `colorScheme`. This will ensure the outline and hover match the chosen colour.

### Overlay

-   You have the option to have a dark overlay like the modal component. You must specify `showOverlay` to get this.

## Props

### Drawer Props

| Props       | Required | Type                           | Description                                                                                                          | Default                   |
| ----------- | -------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| confirmCTA  | `false`  | ButtonProps                    | Settings for the confirm button. This uses the Button component.                                                     |                           |
| declineCTA  | `false`  | ButtonProps                    | Settings for the decline button. This uses the Button component.                                                     |                           |
| isOpen      | `true`   | boolean                        | Is the Drawer Open?                                                                                                  |                           |
| onClose     | `true`   | () => void                     | Pass in a callback to close the Drawer. This will default for the close button and decline CTA is not set otherwise. |                           |
| placement   | `false`  | DrawerPlacementType            | Where on the screen do you want the drawer to open from.                                                             | DrawerPlacementType.RIGHT |
| showOverlay | `false`  | boolean                        | If you do not want the dark overlay and just a simple drawer you can leave this field. defaults to false             | false                     |
| size        | `false`  | DrawerSizeType                 | Defines the width of the drawer on screen. Defaults to medium                                                        | DrawerSizeType.LARGE      |
| title       | `false`  | string                         | Title for the drawer                                                                                                 |                           |
| children    | `true`   | ReactElement or ReactElement[] | Contents of the drawer                                                                                               |                           |

## Todo

-   The Drawers need checking design for the title and close buttons on placements top, bottom, and left.
