# Icon

Icon is a useful mapping component used to get our chosen icons out of [react-icons](https://react-icons.github.io/react-icons/) library.

This also creates a useful tool for passing strings to identify the Icon component in other config objects in other components such as button.

## What's in our library?

The Icon has been set up on react-cosmos at localhost:5000. react-cosmos starts on startup with the dev environment.

You can change between the different libraries and also change the variant on cosmos to help you choose which icon to use or decide if a new icon needs to be added.

## Variant

There are two options for some of the Icons; solid or outline.

## Adding new icons

If you add a new Icon to the library, try and keep to the same collection as the other icons in the set. For example arrows are from the `Tabler` Icons library denoted by `Tb` at the start of the react-icon identification.

When adding new Icons you will need to add one key to the type and add an icon for both the solid and outline libraries, it may be that you repeat the icon in both solid and outline if there is no solid variant available or it doesn't make sense to have one.

## Props

| Props     | Required | Type        | Description                                              | Default |
| --------- | -------- | ----------- | -------------------------------------------------------- | ------- |
| ariaLabel | `true`   | string      | Add an aria label to the component for goo accessibility |         |
| icon      | `true`   | IconType    | The icon you wish to use                                 |         |
| variant   | `false`  | IconVariant | The variant of the icon you are choosing                 |         |
