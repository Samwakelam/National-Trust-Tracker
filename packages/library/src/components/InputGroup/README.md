# InputGroup

The InputGroup component consists of Chakra's `Form Control`, `Input` `FormErrorMessage` and our `Label` components. If you add an addOn and / or element it uses Chakra's `InputGroup` component.

You `MUST` use the `useForm` hook from [`react-hook-form`](https://react-hook-form.com/docs/useform)

## addOn

Add ons are useful to give indicators to the user such as measurement suffix or cost prefix $ or m or meters.

> It is advised not to use an addon with the same position as an element

## element

Elements are useful for things like buttons or icons to indicate if a user has inputted the correct value or to add a search function or action to the input field.

> It is advised not to use an element with the same position as an addon

## Configs

The component is made up of a collection of Chakra components and our own components. While most of the time these have been set up to meet the standard consistency needs, sometimes you might want to edit an individual component. There are three config objects that will help you do this. `inputConfig`, `labelConfig` and `containerConfig`.

These are spread on the input, label and container components respectively so that you can target their individual settings. Please see Label for the label props

## Generic component

InputGroup is a generic component which means you must pass a type into the component. Unfortunately ts won't warn you if this is forgotten.

```
const {
        register,
        formState: { errors },
    } = useForm<any>();
```

```
<InputGroup<any> name='Name' formRegister={{ register }} errors={errors} />
```

The type that you use should match the type you pass to the `useForm` hook

## Props

| Props        | Required | Type                                                                    | Description                                                                                                                                                                                                         | Default              |
| ------------ | -------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| addOn        | `false`  | {left?: C.InputAddonProps, right?: C.InputAddonProps}                   | Adds a block with content to either the left or right of the input field. Or both.                                                                                                                                  |                      |
| element      | `false`  | {left?: C.InputElementProps,right?: C.InputElementProps}                | Adds an element inside the input group                                                                                                                                                                              |                      |
| inputConfig  | `false`  | C.InputProps                                                            | Configuration of the Chakra input component                                                                                                                                                                         |                      |
| errors       | `true`   | FieldErrorsImpl<T>                                                      | Errors object passed from useForm                                                                                                                                                                                   |                      |
| formRegister | `true`   | { register: UseFormRegister<T>, options?: RegisterOptions<T, Path<T>> } | An object that is passed the register component and options to configure isRequired, error messages or limitations on the field                                                                                     |                      |
| label        | `false`  | LabelProps['label']                                                     | Quickly define the label for the InputGroup                                                                                                                                                                         |                      |
| labelConfig  | `false`  | Omit<LabelProps, 'isRequired' and 'htmlFor'>                            | Configuration for the Label component                                                                                                                                                                               | { hideBadge: false } |
| name         | `true`   | Path<T>                                                                 | This name is the 'name' passed to the 'register' object of `useForm`. The register component generates a name field for the form field. This prop also is used for the field `id` and label's `htmlFor` attributes. |                      |

    Chakra's `C.InputAddonProps` are simply `{children}` but you can also [check here](https://chakra-ui.com/docs/components/input/usage#left-and-right-addons).
