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
  bold: true,
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
      "style": "thick",
      "bold": true,
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

#### `style`
Sets the border style to the box.

- Type: `string`
- Values:
    - `"single"`
    - `"thick"`
    - `"round"`
    - `"double"`
- Default: `"single"`


### Colors

#### `color`
Sets the border color of the box.

- Type: `string`
- Allowed values:
    - Hex color value, prefixed with `#` symbol
    - Valid color keyword, within [CSS Colors Level 4 spec](https://drafts.csswg.org/css-color/#named-colors)
- Default: `"cyan"`

#### `textColor`
Sets the color message text.

- Type: `string`
- Allowed values: same as [color](#color)
- Default: `"white"`

#### `bgColor`
Sets the background color of entire box area.

- Type: `string`
- Allowed values: same as [color](#color)
- Default: `undefined` *(no background color)*


### Spacing

#### `padding`
Sets the space between the text and the box.

- Type: `object` `number` `array`
- Allowed values:
	- `object` applies `top`, `right`, `bottom`, `left` properties of object (any omitted properties retain the default)
	- `number` applies value to top, right, bottom, and left
	- `array` maps values similar to [CSS shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
- Default: `{ top: 0, right: 1, bottom: 0, left: 1 }`

#### `margin`
Sets the space outside the box.

- Type: `object` `number` `array`
- Allowed values: same as [padding](#padding)
- Default: `{ top: 0, right: 0, bottom: 1, left: 0 }`


### Other options

#### `bold`
Sets the weight of the border and message text (_where supported_).

- Type: `boolean`
- Default: `false`
