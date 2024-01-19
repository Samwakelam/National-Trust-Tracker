# Modal

A simple Modal container component. Pass in the content you want to configure from the view or component as children.

The modal is made up of Chakra's `Modal`, `ModalOverlay`, `ModalContent`, `ModalHeader`, `ModalFooter`, and `ModalBody` components. `Modal` is the component that uses the portal and `ModalContent` is the styled bit you see on screen.

## Size

You can alter the width of the modal with the `size` prop. This will also effect how the modal is displayed. By default mobile is a drawer from the bottom of the screen, but if you pass a 2xl size, the sm breakpoint will also use a drawer style modal.

## Footer Cta

-   Useful for forms

The Modal foot is always in the component to control the padding below the body. But there is an option for a single cta.

There is a separate configuration for a Confirm Modal with two CTA which can be configured and does not use the footerCta.

## Props

| Props     | Required | Type                           | Description                                              | Default |
| --------- | -------- | ------------------------------ | -------------------------------------------------------- | ------- |
| children  | `true`   | ReactElement or ReactElement[] | Contents of the modal                                    |         |
| footerCTA | `false`  | C.ButtonProps                  | A singular cta that sits across the bottom of the modal. |         |
| isOpen    | `true`   | boolean                        | Is the modal Open?                                       |         |
| onClose   | `true`   | () => void                     | Pass in a callback to close the modal.                   |         |
| size      | `false`  | 'xs' 'sm' 'md' 'lg' 'xl' '2xl' | size of the modal                                        | md      |
| title     | `false`  | string                         | Title for the modal                                      |         |
