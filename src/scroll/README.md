# Scroll

> A component which implement `pull to refresh` and `fetch more when reach end`

## Use

```js
import { Scroll } from '@cqmbr/cha'
```

## Props

### height

> `height` of scroll component's root element, default value is `100%`

- type: `number`
- required: `false`
- default: `100%`

### className

> `className` of scroll component's root element, no default value presented

- type: `string`
- required: `false`
- default: `undefined`

### wrapperClassName

> `className` of scroll component's content wrapper element, no default value presented

- type: `string`
- required: `false`
- default: `undefined`

### onRefresh

> it will be called when pull to refresh

- type: `function`
- required: `false`
- default: `undefined`

### refreshing

> whether the scroll component in refresh state

- type: `boolean`
- required: `false`
- default: `false`

### onEndReached

> it will be called when end reached

- type: `function`
- required: `false`
- default: `undefined`

### onEndReachedThreshold

> distance to the end of content to trigger the `onEndReached` callback

- type: `number`
- required: `false`
- -default: `100`

### refreshText

> the text to show before refresh

- type: `string` | `ReactElement`
- required: `false`
- default: `Pull To Refresh`
