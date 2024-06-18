# Frame

A container component that creates a vertical section slice within your view. Designed to be used with scrollSpy if needed, this component has an enveloped container so that the frame spans the width of your view but controls the max width of your content and the relative padding needed.

-   Advised that the view be wrapped in ScrollBox

-   Change the background for each frame by passing a css string to the `background` prop

## Layout

Frame can be customised to suit the needs of the content using a couple of different boolean props.

-   `isTightlyGrouped`
-   `isWideWidth`

    Both of these are useful for table data.
    Turning these off is better for presentation data.

-   `isBanner` will fix the Y axis padding.

    This is useful for CTA and notification or warning data.

    ## Background

    To change the colour of the frame simply change the `colorScheme` prop

## Props

| Props | Required | Type | Description | Default |
| ----- | -------- | ---- | ----------- | ------- |

| children | `true` | React.ReactElement or React.ReactElement[] | Content of your Frame component | |
| hasPadding | `false` | boolean | Do you want the containing content to have padding in all views or to carousel off the edge in mobile and tablet? | false |
| id | `true` | string | Unique Identifier to be referenced in a tags if required | |
| isBanner | `false` | boolean | This has smaller Y axis padding values and acts as a banner on the page rather than a full section of content | false |
| isTightlyGrouped | `false` | boolean | Do you want the frame tightly grouped with the other frames in the page? Both padding and gaps are changed. | false |
| isWideWidth | `false` | boolean | Do you want this to fill the width of the screen? | false |

## Todo

-   Adjust negative margin for header height
