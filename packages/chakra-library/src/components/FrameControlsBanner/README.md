# ControlsBanner

The ControlsBanner is a banner component to sit (usually) at the top of the page. Its purpose is to hold controls (Buttons) for your view.

**If you pass a slug to the banner you will get a back button.**

The ControlsBanner implements the `Frame` component so should `not` sit within another Frame.

Currently the id attribute is set so only `one` ControlsBanner should be used per view.

## Responsive design

The Controls banner is mobile responsive and will convert the buttons passed in as children, into menuItemProps in the `Menu` component.

The `Menu` component will display when there are too many children to fit into the space provided on one line. We maintain a gap between the controls and the back button should a slug be passed in.

## Props

| Props    | Required | Type                                                            | Description                                             | Default |
| -------- | -------- | --------------------------------------------------------------- | ------------------------------------------------------- | ------- |
| children | `false`  | ReactElement or (ReactElement or undefined or false)[] or false | Buttons or other controls to be passed into the banner. |         |
| slug     | `false`  | To                                                              | Where the back button will navigate to.                 |         |
