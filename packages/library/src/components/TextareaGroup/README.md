# TextareaGroup

The TextareaGroup component consists of Chakra's `Form Control`, `Textarea` `FormErrorMessage` and our `Label` components.

You `MUST` use the `useForm` hook from [`react-hook-form`](https://react-hook-form.com/docs/useform)

## Generic component

TextareaGroup is a generic component which means you must pass a type into the component. Unfortunately ts won't warn you if this is forgotten.

```
const {
        register,
        formState: { errors },
    } = useForm<any>();
```

```
<TextareaGroup<any> name='Name' formRegister={{ register }} errors={errors} />
```

The type that you use should match the type you pass to the `useForm` hook

## Props

The Props extend `LabelProps`

| Props          | Required | Type                                                                    | Description                                                                                                                                                                                                         | Default              |
| -------------- | -------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| errors         | `true`   | FieldErrorsImpl<T>                                                      | Errors object passed from useForm                                                                                                                                                                                   |                      |
| formRegister   | `true`   | { register: UseFormRegister<T>, options?: RegisterOptions<T, Path<T>> } | An object that is passed the register component and options to configure isRequired, error messages or limitations on the field                                                                                     |                      |
| label          | `false`  | LabelProps['label']                                                     | Quickly define the label for the TextareaGroup                                                                                                                                                                      |                      |
| labelConfig    | `false`  | Omit<LabelProps, 'isRequired' and 'htmlFor'>                            | Configuration for the Label component                                                                                                                                                                               | { hideBadge: false } |
| name           | `true`   | Path<T>                                                                 | This name is the 'name' passed to the 'register' object of `useForm`. The register component generates a name field for the form field. This prop also is used for the field `id` and label's `htmlFor` attributes. |                      |
| textAreaConfig | `false`  | C.TextareaProps                                                         | Configuration of the Chakra Textarea component                                                                                                                                                                      |                      |
