# InputAndSelectBar

A component designed to group `InputGroup` and `SelectGroup` components in a bar.

Only pass in `InputGroup` and `SelectGroup` components.

This component does **not** use our Bar component.

## Props

| Props    | Required | Type                     | Description                                    | Default |
| -------- | -------- | ------------------------ | ---------------------------------------------- | ------- |
| children | `true`   | ChildType[] or ChildType | The Select and Inputs that you want to include |         |

Where ChildType = `ReactElement<InputGroupProps<any>> | ReactElement<SelectGroupProps<any, string>>;`

Unfortunately ts does not warn you if you passed a component that is not `InputGroup` or `SelectGroup`
