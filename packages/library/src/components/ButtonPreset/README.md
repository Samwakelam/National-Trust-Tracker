# Button Preset

A simple configuration of a number of commonly used buttons.

Designed for speed this is still a Button component at the root.

## Setting up a new preset

The preset component is made up of a switch that uses the `preset` prop
Make sure to spread `{...props}` at the end of your button so that the developer can still make any specific changes in the code where required.

## Props

Extends the ButtonProps

| Prop   | Required | Type       | Description                 | Default |
| ------ | -------- | ---------- | --------------------------- | ------- |
| preset | `true`   | ButtonType | Which preset do you require |         |
