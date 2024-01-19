# Card

A simple card component. It has three variants: `filled`, `elevated` and `outline`.

## Image Card

An image can be passed into the card. This appears at the top or left side of the card depending on the card layout you choose; vertical or horizontal respectively.

The card does not yet have an image background setting.

## Props

Extends Chakra's CardProps

| Props             | Required | Type                                    | Description                                                                                                                                    | Default    |
| ----------------- | -------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| confirmCTA        | `false`  | ButtonProps                             | Settings for the confirm button. This uses the Button component.                                                                               |            |
| declineCTA        | `false`  | ButtonProps                             | Settings for the decline button. This uses the Button component.                                                                               |            |
| hasNegativeMargin | `false`  | boolean                                 | This will extend the card outside of its container by -1rem on either side to allow the content to align with the flow above. Useful in forms. |            |
| heading           | `false`  | string                                  | Heading for the card                                                                                                                           |            |
| icon              | `false`  | IconProps & { position?: PositionType } | Icon for the card                                                                                                                              |            |
| image             | `false`  | Chakra ImageProps                       | Properties for an image on the card                                                                                                            |            |
| layout            | `false`  | 'horizontal' OR 'vertical'              | How the Card content should be laid out. This is most relevant with an image                                                                   | 'vertical' |
