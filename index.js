
const chalk = require('chalk');

const styles = {
  default: [ '─', '│', '┌', '┐', '└', '┘' ],
  thick:   [ '━', '┃', '┏', '┓', '┗', '┛' ],
  round:   [ '─', '│', '╭', '╮', '╰', '╯' ],
  double:  [ '═', '║', '╔', '╗', '╚', '╝' ]
}

const defaultOpts = {
  style: 'default',
  color: '#00ffff',
  textColor: 'white',
  bgColor: undefined,
  bold: false
}

const setChalk = (bold, color = 'white', bgColor = undefined) => {

  let c = chalk;

  if (bold) c = c.bold;

  if (color) {
    try {
      c   = (color.charAt(0) == '#') ? c.hex(color) : c.keyword(color);
    } catch (error) {
      throw new Error(`'${color}' is not a valid color`);
    }
  }

  if (bgColor) {
    try {
       c = (bgColor.charAt(0) == '#') ? c.bgHex(bgColor) : c.bgKeyword(bgColor);
    } catch (error) {
      throw new Error(`'${bgColor}' is not a valid color`);
    }
  }

  return c;

}

module.exports = (msg, opts) => {

  opts = Object.assign(defaultOpts, opts);

  let [ _h, _v, _tl, _tr, _bl, _br ] = styles[opts.style] || styles.default;

  let chalkEdge  = setChalk(opts.bold, opts.color, opts.bgColor),
      chalkText  = setChalk(opts.bold, opts.textColor, opts.bgColor);

  let lineH      = _h.repeat(msg.length + 2),
      top        = `${_tl}${lineH}${_tr}`,
      btm        = `${_bl}${lineH}${_br}`;

  let outputBefore = chalkEdge(`${top}\n${_v} `),
      outputMsg    = chalkText(msg),
      outputAfter  = chalkEdge(` ${_v}\n${btm}`);

  console.log(outputBefore + outputMsg + outputAfter);

}
