# Log box
Logs console messages inside a nice box


## Install

```bash
$ npm install log-box
```


## Usage

### Default options

```js
const logBox = require('log-box');

logBox('Yes.');
```

### Inline options

```js
const logBox = require('log-box');

logBox('Oh, very nice!', {
  style: 'round',
  color: 'black',
  textColor: 'black',
  bgColor: '#ccff00',
  margin: {
    left: 5
  },
  padding: {
    left: 5,
    bottom: 10
  }
});
```

### Configuration in `package.json`

`package.json`:

```js
{
  "name": "your-project",
  "version": "0.1.0",
  ...
  "log-box": {
    "default": {
      "style": "round"
    },
    "exampleA": {
      "color": "#90f"
    },
    "exampleB": {
      "style": "strong",
      "color": "black",
      "textColor": "black",
      "bgColor": "red"
    }
  }
}
```

```js
const logBox = require('log-box');

// Shows "default" setting from package.json
logBox('Impressive!');

// Shows "exampleB" setting from package.json
logBox('Quite good!', 'exampleB');

```



## Options


### Border style

#### `style` [string]
Sets the border style of the box.

- Default: `"single"`
- Allowed values:
    - `"single"`
    - `"strong"`
    - `"round"`
    - `"double"`


### Colors

#### `color` [string]
Sets the border color of the box.

- Default: `"white"`
- Allowed values:
    - Hex color value, prefixed with `#` symbol (e.g., `"#ff00ff"`)
    - Valid color keyword, within [CSS Colors Level 4 spec](https://drafts.csswg.org/css-color/#named-colors) (e.g., `"cyan"`)

#### `textColor` [string]
Sets the message text color.

- Default: `"white"`
- Allowed values: same as [color](#color)

#### `bgColor` [string]
Sets the background color of the entire box area, including message text.

- Default: `undefined` *(no background color)*
- Allowed values: same as [color](#color)

### Spacing

#### `padding` [object] [number] [array]
Sets the spacing inside the box, between the border and the message text.

- Allowed values:
	- `object` — applies `top`, `right`, `bottom`, `left` properties of object (any omitted properties retain the default)
	- `number` — applies value to top, right, bottom, and left
	- `array` — maps values similar to [CSS shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
- Default: `{ top: 0, right: 1, bottom: 0, left: 1 }`

#### `margin` [object] [number] [array]
Sets the spacing outside the box.

- Allowed values: same as [padding](#padding)
- Default: `{ top: 0, right: 0, bottom: 1, left: 0 }`
