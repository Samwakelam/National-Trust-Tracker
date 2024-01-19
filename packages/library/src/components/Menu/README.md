# Menu

A Menu component with trigger button.

You must pass an array of menu items. This array can be a number of setups depending on how you want the menu list to look.

-   `'divider'` - written as a string; this returns a dividing line in the menu list.
-   `Menu item` - pass in a straight forward menu item object
-   `Menu group` - pass in a [grouping object](#grouping-menu-items) that names and groups menu items.

## Grouping menu items

If you want to group menu Items under a title in the menu list. pass in an object with `title` and `groupItems` props where:

-   `title` is a string
-   `groupItems` is an array of `MenuItems`

## Props

**Menu**

| Props          | Required | Type                         | Description                                                   | Default |
| -------------- | -------- | ---------------------------- | ------------------------------------------------------------- | ------- |
| menuItems      | `true`   | MenuItem[]                   | An Array of menu items                                        |         |
| menuConfig     | `false`  | Chakra.MenuProps             | Use menuConfig to configure the Chakra.Menu component         |         |
| menuListConfig | `false`  | Chakra.MenuListProps         | use menuListConfig to configure the Chakra.MenuList component |         |
| buttonConfig   | `false`  | Omit<ButtonProps, 'onClick'> | Configure the trigger button component                        |         |

**Menu Items**

| Props  | Required | Type                 | Description                                                             | Default |
| ------ | -------- | -------------------- | ----------------------------------------------------------------------- | ------- |
| config | `false`  | Chakra.MenuItemProps | use this Config to pass additional props to Chakra's MenuItem component |         |
| icon   | `false`  | IconProps            | Add an icon to the start of the menu item                               |         |
| image  | `false`  | Chakra.ImageProps    | add an image to the start of the menu item                              |         |
| label  | `true`   | string               | The text that you see for the menu item                                 |         |
