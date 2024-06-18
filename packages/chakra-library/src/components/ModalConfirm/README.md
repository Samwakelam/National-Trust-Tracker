# Modal Confirm

A Modal created for confirmation actions.

-   There are two CTA buttons coded into the layout of this modal as well as a title and description to warn or advise the user.
-   You cannot pass Children to this modal; they are configured for you.
-   This uses our `Modal` and `Button` components.

## Description

If you need more than one paragraph in your description, pass the paragraph strings to `description` prop as an array.

### CTA

-   You must pass a `confirmCTA` object the `confirm` and `decline` buttons are displayed in the modal for you.
-   You do not have to send any additional settings for the `declineCTA`, the onClick with default to the `onClose` callback and the children defaults to 'Cancel'.
-   If you want to override the `declineCTA` you can pass in ButtonProps as an object.
-   The quickest props to change for the Button Colour are `colorScheme`. This will ensure the outline and hover match the chosen colour.

## Props

| Props       | Required | Type               | Description                                                                                                         | Default                                                   |
| ----------- | -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| confirmCTA  | `true`   | ButtonProps        | Settings for the confirm button. This uses the Button component.                                                    |                                                           |
| declineCTA  | `false`  | ButtonProps        | Settings for the decline button. This uses the Button component.                                                    |                                                           |
| isOpen      | `true`   | boolean            | Is the modal Open?                                                                                                  |                                                           |
| onClose     | `true`   | () => void         | Pass in a callback to close the modal. This will default for the close button and decline CTA is not set otherwise. |                                                           |
| title       | `false`  | string             | Title for the modal                                                                                                 | 'Are you sure?'                                           |
| description | `false`  | string or string[] | Additional information for the user on the outcome of their selection                                               | "Clicking confirm will be permanent and can't be undone." |
