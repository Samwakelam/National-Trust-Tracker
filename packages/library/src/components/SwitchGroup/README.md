# Switch Group

The SwitchGroup component consists of Chakra's `Form Control`, `Switch` and our `Label` components.

You `MUST` use the `useForm` hook from [`react-hook-form`](https://react-hook-form.com/docs/useform)

## Changing the background

It is common with switches to change the track background depending on it's state for better UI.

We have included a `thumb` and `track` props to change the colour of the background. pass in a chakra colour eg 'red.100'

```
    export type CheckedProps = {
        on: string;
        off: string;
    };
```

> Note Thumb is not yet set up

## Generic component

SwitchGroup is a generic component which means you must pass a type into the component. Unfortunately ts won't warn you if this is forgotten.

```
const {
        register,
        formState: { errors },
    } = useForm<any>();
```

```
<SwitchGroup<any> name='Name' formRegister={{ register }} errors={errors} />
```

The type that you use should match the type you pass to the `useForm` hook.

## Tooltip

You can include a tooltip with the switch group for extra guidance. Pass tooltip as a config to the SwitchGroup component and it will appear at the end of the label as an `i` symbol [Chakra Tooltip](https://chakra-ui.com/docs/components/tooltip/usage).

## Props

The Props extend `LabelProps` but switches do not have badges so `hideBadge` has been hard coded to `true`

| Props             | Required | Type                                                                    | Description                                                                                                                                                                                                         | Default         |
| ----------------- | -------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| errors            | `true`   | FieldErrors<T>                                                          | Errors object passed from useForm                                                                                                                                                                                   |                 |
| formControlConfig | `false`  | C.FormControlProps                                                      | Configuration of the Chakra form control component                                                                                                                                                                  |                 |
| formRegister      | `true`   | { register: UseFormRegister<T>, options?: RegisterOptions<T, Path<T>> } | An object that is passed the register component and options to configure isRequired, error messages or limitations on the field                                                                                     |                 |
| label             | `false`  | LabelProps['label']                                                     | Quickly define the label for the SwitchGroup                                                                                                                                                                        |                 |
| labelConfig       | `false`  | Omit<LabelProps, 'isRequired' and 'htmlFor' and 'hideBadge'>            | Configuration for the Label component                                                                                                                                                                               |                 |
| name              | `true`   | Path<T>                                                                 | This name is the 'name' passed to the 'register' object of `useForm`. The register component generates a name field for the form field. This prop also is used for the field `id` and label's `htmlFor` attributes. |                 |
| switchConfig      | `false`  | SwitchConfigProps                                                       | Configuration of the Chakra switch component                                                                                                                                                                        |                 |
| thumb             | `false`  | CheckedProps                                                            | Set up the color for the on and off state of the thumb                                                                                                                                                              | not enabled yet |
| track             | `false`  | CheckedProps                                                            | Set up the color for the on and off state of the track                                                                                                                                                              |                 |

## ToDo

-   move Styled components transient to component only, not passed props (ie. remove the $ in the component props and keep only in the styled component).

-   Remove Styled Components.
