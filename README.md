# Log box
Generates a nicely styled box around text in the command line


## Install

```bash
$ npm install log-box
```


## Usage

```js
const logBox = require('log-box');

logBox('OK, great.');

logBox('Woah!', {
  style: 'round',
  color: 'black',
  textColor: 'black',
  bgColor: '#ccff00',
  bold: true,
  padding: 3
});

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

#### `padH`
Sets horizontal space (characters) between the text and the border.

- Type: `number`
- Default: `1`

#### `padV`
Sets vertical space (lines) between the text and the border.

- Type: `number`
- Default: `0`

#### `marginTop`
Sets the number of lines of spacing above the box.

- Type: `number`
- Default: `0`

#### `marginBottom`
Sets the number of lines of spacing below the box.

- Type: `number`
- Default: `1`

#### `padding`
Convenience function for setting `padH` and `padV` with one value, as follows:

`padH` is set to one more than the value, and `padV` is set to a rounded-down third of the value. Thus, `padding: 0` is equivalent to the default settings for `padH` and `padV`.

- Type: `number`
- Default: `undefined`

#### `margin`
Convenience function for setting `marginTop` and `marginBottom` to the same value.

- Type: `number`
- Default: `undefined`


### Other options

#### `bold`
Sets the weight of the border and message text (_where supported_).

- Type: `boolean`
- Default: `false`
