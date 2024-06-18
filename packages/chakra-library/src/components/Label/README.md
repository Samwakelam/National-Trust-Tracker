# Label

This component is for form elements. You are unlikely to need to reference it unless building a new form field group.

All of the form field groups extend `LabelProps` and pass them down.

This label can be displayed with a badge and a tooltip, and the `label` text prop can also be omitted if you don't want your form field to show a label.

It uses Chakra's `FormLabel`, `Badge` and `Tooltip` components.

## Display

The prop `display` will stack the badge under the label if `'stack'` is passed. This prop defaults to all on one line.

If there is a tooltip present, so that it doesn't look lost, it will stay with the label if the badge is hidden or stack with the badge on the next line.

## Tooltip

You can include a tooltip with the `Label` for extra guidance. Pass tooltip as a config to the `Label` component and it will add it at the end of the label after the badge.

If the `display` prop is passed `'stack'`, so that it doesn't look lost, it will stay with the label if the badge is hidden or stack with the badge on the next line.

[Chakra Tooltip](https://chakra-ui.com/docs/components/tooltip/usage).

## Props

The Props extend `FormLabelProps` from chakra. The Input groups do not currently offer direct ability to pass these on at this time.

| Props      | Required | Type                             | Description                                                  | Default  |
| ---------- | -------- | -------------------------------- | ------------------------------------------------------------ | -------- |
| display    | `false`  | 'linear' or 'stack'              | how you want the label and badge to sit on screen            | 'linear' |
| hideBadge  | `false`  | boolean                          | hides the optional and required badges                       |          |
| htmlFor    | `true`   | string                           | the html for attribute to link it to the corresponding input |          |
| isRequired | `true`   | boolean                          | Controls the badge value and colour if shown                 |          |
| label      | `false`  | string                           | The text for the label component                             |          |
| tooltip    | `false`  | Omit<C.TooltipProps, 'children'> | Config for the tooltip component                             |          |
