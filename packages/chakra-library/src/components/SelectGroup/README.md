# SelectGroup

The SelectGroup component consists of Chakra's `Form Control`, `Select` `FormErrorMessage` and our `Label` components.

You `MUST` use the `useForm` hook from [`react-hook-form`](https://react-hook-form.com/docs/useform)

## Options

Options are an array but there are two types you can pass in.

-   `string array` where the string is both the option text and value,
-   `tuple type array` where the second parameter is the value field and the first index is the options text. This is useful if you want the value to be numeric or cased to match a key value when received.
    > [text, value][]

## Filtering

If you have a long list of options such as countries, it can be useful for the user to be able to filter the values in the select. Pass the `canFilter` prop to the component to allow typing in the field.

If you provide the `canFilter` prop, you actually get an `InputGroup` component back attached to a `datalist`. This is why the selectConfig is both Chakras SelectProps and Chakras InputProps.

## Generic component

SelectGroup is a generic component with **two** props which means you must pass two types into the component. Unfortunately ts won't warn you if this is forgotten.

-   T The same type as your form
-   K extends string and is simply the primary value of the option field. This will be displayed in the select option and usually its value. [See options for details](#options).

```
const {
        register,
        formState: { errors },
    } = useForm<Form>();
```

```
<SelectGroup<Form, string> name='Name' formRegister={{ register }} errors={errors} />
```

The type that you use should match the type you pass to the `useForm` hook

## Props

| Props        | Required | Type                                                                    | Description                                                                                                                                                                                                         | Default              |
| ------------ | -------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| canFilter    | `false`  | boolean                                                                 | Can you type into the select component to filter the available options?                                                                                                                                             | false                |
| defaultValue | `false`  | K                                                                       | The value that is selected by default when the component loads. If this is not present then a generic 'Select' will be visible with value ''                                                                        |                      |
| errors       | `true`   | FieldErrors<T>                                                          | Errors object passed from useForm                                                                                                                                                                                   |                      |
| formRegister | `true`   | { register: UseFormRegister<T>, options?: RegisterOptions<T, Path<T>> } | An object that is passed the register component and options to configure isRequired, error messages or limitations on the field                                                                                     |                      |
| label        | `false`  | LabelProps['label']                                                     | Quickly define the label for the SelectGroup                                                                                                                                                                        |                      |
| labelConfig  | `false`  | Omit<LabelProps, 'isRequired' and 'htmlFor'>                            | Configuration for the Label component                                                                                                                                                                               | { hideBadge: false } |
| name         | `true`   | Path<T>                                                                 | This name is the 'name' passed to the 'register' object of `useForm`. The register component generates a name field for the form field. This prop also is used for the field `id` and label's `htmlFor` attributes. |                      |
| options      | `true`   | K[] or [K, string or number][]                                          | An Array of the options you want in your select.                                                                                                                                                                    |                      |
| selectConfig | `false`  | C.SelectProps & C.InputProps                                            | Configuration of the Chakra select component                                                                                                                                                                        |                      |

## Gotchas

-   Props from my selectConfig object are not working?

    Check what props you can definitely pass using the [Chakra Docs](https://chakra-ui.com/docs/components/select/usage). The config object takes props for both select and input, see [Filtering](#filtering) for the reason behind this.

## ToDo

-   When filter is cleared its not good ui
