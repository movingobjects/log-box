
const chalk = require('chalk');

const styles = {
  single: [ '─', '│', '┌', '┐', '└', '┘' ],
  thick:  [ '━', '┃', '┏', '┓', '┗', '┛' ],
  round:  [ '─', '│', '╭', '╮', '╰', '╯' ],
  double: [ '═', '║', '╔', '╗', '╚', '╝' ]
}

const defaultOpts = {
  style: 'single',
  padding: {
    top: 0,
    right: 1,
    bottom: 0,
    left: 1
  },
  margin: {
    top: 0,
    right: 0,
    bottom: 1,
    left: 0
  },
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

const normSpacing = (spacing, defaults) => {

  defaults = Object.assign({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, defaults);

  if (Number.isInteger(Math.round(spacing))) {
    return {
      top: spacing,
      right: spacing,
      bottom: spacing,
      left: spacing
    };

  } else if (Array.isArray(spacing)) {
    if (spacing.length >= 4) {
      return { top: spacing[0], right: spacing[1], bottom: spacing[2], left: spacing[3] };
    } else if (spacing.length >= 2) {
      return { top: spacing[0], right: spacing[1], bottom: spacing[0], left: spacing[1] };
    } else if (spacing.length >= 1) {
      return { top: spacing[0], right: spacing[0], bottom: spacing[0], left: spacing[0] };
    } else {
      return defaults;
    }

  } else if (typeof spacing === 'object') {
    return {
      top: spacing.top || defaults.top,
      right: spacing.right || defaults.right,
      bottom: spacing.bottom || defaults.bottom,
      left: spacing.left || defaults.left
    }
  } else {
    return defaults;
  }

}

module.exports = (msg, opts) => {

  opts     = Object.assign(defaultOpts, opts);

  let padding = normSpacing(opts.padding, defaultOpts.padding),
      margin  = normSpacing(opts.margin, defaultOpts.margin);

  let [ _h, _v, _tl, _tr, _bl, _br ] = styles[opts.style] || styles.default;

  let chalkEdge = setChalk(opts.color, opts.bgColor, opts.bold),
      chalkText = setChalk(opts.textColor, opts.bgColor, opts.bold);

  let iw  = padding.left + msg.length + padding.right;

  let mt  = '\n'.repeat(margin.top),
      mb  = '\n'.repeat(margin.bottom),
      mr  = ' '.repeat(margin.right),
      ml  = ' '.repeat(margin.left),
      pr  = ' '.repeat(padding.right),
      pl  = ' '.repeat(padding.left);

  let lt  = (ml + chalkEdge(_tl + _h.repeat(iw) + _tr) + mr + '\n'),
      lit = (ml + chalkEdge(_v + ' '.repeat(iw) + _v) + mr + '\n').repeat(padding.top),
      lm  = (ml + chalkEdge(_v + pl) + chalkText(msg) + chalkEdge(pr + _v) + mr + '\n'),
      lib = (ml + chalkEdge(_v + ' '.repeat(iw) + _v) + mr + '\n').repeat(padding.bottom),
      lb  = (ml + chalkEdge(_bl + _h.repeat(iw) + _br) + mr);

  console.log(mt + lt + lit + lm + lib + lb + mb);

}
