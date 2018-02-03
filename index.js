
const chalk = require('chalk');

const styles = {
  single: [ '─', '│', '┌', '┐', '└', '┘' ],
  thick:  [ '━', '┃', '┏', '┓', '┗', '┛' ],
  round:  [ '─', '│', '╭', '╮', '╰', '╯' ],
  double: [ '═', '║', '╔', '╗', '╚', '╝' ]
}

const defaultOpts = {
  style: 'single',
  padH: 1,
  padV: 0,
  marginTop: 0,
  marginBottom: 1,
  color: '#00ffff',
  textColor: 'white',
  bgColor: undefined,
  bold: false
}

const setChalk = (color = 'white', bgColor = undefined, bold = false) => {

  let c = chalk;

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

  if (bold) {
    c = c.bold;
  }

  return c;

}

module.exports = (msg, opts) => {

  opts = Object.assign(defaultOpts, opts);

  if (opts.padding) {
    opts.padH = Math.max(0, opts.padding + 1);
    opts.padV = Math.max(0, Math.floor(opts.padding / 3));
  }

  if (opts.margin) {
    opts.marginTop    = Math.max(0, opts.margin);
    opts.marginBottom = Math.max(0, opts.margin);
  }

  let [ _h, _v, _tl, _tr, _bl, _br ] = styles[opts.style] || styles.default;

  let chalkEdge = setChalk(opts.color, opts.bgColor, opts.bold),
      chalkText = setChalk(opts.textColor, opts.bgColor, opts.bold);

  let midW  = msg.length + (opts.padH * 2),
      lineH = _h.repeat(midW),
      top   = `${_tl}${lineH}${_tr}`,
      btm   = `${_bl}${lineH}${_br}`,
      left  = _v + ` `.repeat(opts.padH),
      right = ` `.repeat(opts.padH) + _v;

  let spacingInner  = `${_v}${' '.repeat(midW)}${_v}\n`.repeat(opts.padV);
      spacingTop    = `\n`.repeat(opts.marginTop);
      spacingBottom = `\n`.repeat(opts.marginBottom);

  let outputBefore = chalkEdge(`${top}\n${spacingInner}${left}`),
      outputMsg    = chalkText(msg),
      outputAfter  = chalkEdge(`${right}\n${spacingInner}${btm}`);

  console.log(spacingTop + outputBefore + outputMsg + outputAfter + spacingBottom);

}
