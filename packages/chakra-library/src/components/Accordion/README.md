# Accordion

A simple accordion component that can be a collapsible panel for one or more features.

## Props

### AccordionProps

| Props            | Required | Type                                        | Description                                                                           | Default |
| ---------------- | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------- | ------- |
| allowMultiple    | `false`  | boolean                                     | This allows multiple panels to be open at once                                        | false   |
| allowToggle      | `false`  | boolean                                     | allows you to open AND close the panel. False will render the panel permanently open. | true    |
| items            | `true`   | [AccordionItemProps, AccordionPanelProps][] | A turple type Array to set up the header and the content of each accordion item       |         |
| uniqueIdentifier | `true`   | string or number                            | This is an id for the accordion to help individualise the container.                  |         |

### AccordionItemProps

| Props         | Required | Type               | Description                                                                                                                                                 | Default |
| ------------- | -------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| expandedStyle | `false`  | SystemStyleObject  | Chakra allows the style of the header to change when expanded. [See Docs](https://chakra-ui.com/docs/components/accordion/usage#styling-the-expanded-state) |         |
| icon          | `false`  | AccordionIconProps | Allows for an icon to be added to the title either before or after the text dependent on the position you specify,                                          |         |
| text          | `true`   | string             | Title text for the Accordion Header                                                                                                                         |         |

### AccordionPanelProps

| Props    | Required | Type                           | Description                     | Default |
| -------- | -------- | ------------------------------ | ------------------------------- | ------- |
| children | `true`   | ReactElement or ReactElement[] | The content of the hidden panel |         |
