# Card Form

Card form is a preset card for forms to keep consistency with the layouts and gaps

It has two dot notation child components `Section` and `Group`.

-   `Group` organise child components in flex rows but already has column set for mobile
-   `Section` has an addition of a heading and organise child components in flex columns

# Props

## CardFormProps

-   CardForm
-   CardForm.Group

| Props    | Required | Type     | Description    | Default |
| -------- | -------- | -------- | -------------- | ------- |
| children | `true`   | Children | React Children |         |

## CardFormSectionProps

-   CardForm.Section

| Props    | Required | Type     | Description                               | Default |
| -------- | -------- | -------- | ----------------------------------------- | ------- |
| children | `true`   | Children | React Children                            |         |
| heading  | `true`   | string   | Provides a titled section within the card |         |
