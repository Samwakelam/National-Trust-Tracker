# Multi Switch

A component with multiple switches where only a single value can be selected. This component uses the Chakra `RadioGroup` and `Radio` components.

-   Useful for menu options
-   useful for forms

It works and submits as a radio group component but the styling is like a button group.

## Label and Value

In the `switches` array you can set up each switch.

-   `label` is optional; if not set the switch will display the value.
-   `value` is required.
-   `config` is optional.

## Default Checked

Each Switch can be passed an optional configuration object and is built from Chakra's `Radio` component. Typescript will throw an error if you pass `isChecked` or `defaultChecked` to this config object because nothing will happen. To use these props on the Chakra Radio components you also need to pass onChange and control the radio components **outside** of Chakra's `RadioGroup`. `RadioGroup` is controlling the onChange and selected value.

To set a defaultChecked value to the group, use the `MultiSwitch.component` prop `switchConfig: {defaultValue: ... }` and pass in the value that you wish to be default.

> **Note** that you should specify the value and not the label as the defaultValue

## onChange

If you want to specify a custom onChange action you should pass it to the `switchConfig` prop.

## Props

| Props        | Required | Type                                                                                            | Description                                                                                                                                                                                                         | Default |
| ------------ | -------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| errors       | `true`   | FieldErrorsImpl<T>                                                                              | Errors object passed from useForm                                                                                                                                                                                   |         |
| formRegister | `true`   | { register: UseFormRegister<T>, options?: RegisterOptions<T, Path<T>> }                         | An object that is passed the register component and options to configure isRequired, error messages or limitations on the field                                                                                     |         |
| name         | `true`   | Path<T>                                                                                         | This name is the 'name' passed to the 'register' object of `useForm`. The register component generates a name field for the form field. This prop also is used for the field `id` and label's `htmlFor` attributes. |         |
| switches     | `true`   | { label?: string; value: string; config?: Omit<RadioProps, 'defaultChecked' and 'isChecked'>}[] | Set up for each switch in group                                                                                                                                                                                     |         |
| switchConfig | `false`  | Omit<Chakra.RadioGroupProps, 'children'>                                                        | Configuration of the Chakra Radio Group component                                                                                                                                                                   |         |
