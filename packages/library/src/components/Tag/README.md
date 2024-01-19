# Tag

A simple Tag component extends [Chakra's Tag](https://chakra-ui.com/docs/components/tag/usage).

## Tag with an Icon

Instead of using Chakra's tag Icon it uses our own Icon with Icon library.
The icon prop extends IconProps with `position`. If position is not included in the props the icon will default to left of the tag.

## Props

| Props | Required | Type         | Description      | Default |
| ----- | -------- | ------------ | ---------------- | ------- |
| icon  | `false`  | TagIconProps | Icon for the tag |         |
