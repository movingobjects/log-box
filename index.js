
const chalk     = require('chalk'),
      pkgConf   = require('pkg-conf'),
      pkgConfig = pkgConf.sync('log-box');

const STYLES = Object.freeze({
  single: [ '─', '│', '┌', '┐', '└', '┘' ],
  strong:  [ '━', '┃', '┏', '┓', '┗', '┛' ],
  round:  [ '─', '│', '╭', '╮', '╰', '╯' ],
  double: [ '═', '║', '╔', '╗', '╚', '╝' ]
});

const DEFAULT_OPTS = Object.freeze({
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
  color: 'white',
  textColor: 'white',
  bgColor: undefined
});

const processOpts = (inlineOpts) => {

  let opts = { };

  opts = Object.assign(opts, DEFAULT_OPTS);

  if (typeof inlineOpts === 'string') {
    if (pkgConfig && pkgConfig[inlineOpts]) {
      opts = Object.assign(opts, pkgConfig[inlineOpts]);
    }
  } else {
    if (pkgConfig && pkgConfig.default) {
      opts = Object.assign(opts, pkgConfig.default);
    }
    if (inlineOpts) {
      opts = Object.assign(opts, inlineOpts);
    }
  }

  opts.padding = normSpacing(opts.padding, DEFAULT_OPTS.padding);
  opts.margin  = normSpacing(opts.margin,  DEFAULT_OPTS.margin);

  return opts;

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

const setChalk = (color = 'white', bgColor = undefined) => {

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

  return c;

}

const createOutput = (msg, opts) => {

    let [ _h, _v, _tl, _tr, _bl, _br ] = STYLES[opts.style] || STYLES.default;

    let chalkEdge = setChalk(opts.color, opts.bgColor),
        chalkText = setChalk(opts.textColor, opts.bgColor);

    let iw  = opts.padding.left + msg.length + opts.padding.right;

    let mt  = '\n'.repeat(opts.margin.top),
        mb  = '\n'.repeat(opts.margin.bottom),
        mr  = ' '.repeat(opts.margin.right),
        ml  = ' '.repeat(opts.margin.left),
        pr  = ' '.repeat(opts.padding.right),
        pl  = ' '.repeat(opts.padding.left);

    let lt  = (ml + chalkEdge(_tl + _h.repeat(iw) + _tr) + mr + '\n'),
        lit = (ml + chalkEdge(_v + ' '.repeat(iw) + _v) + mr + '\n').repeat(opts.padding.top),
        lm  = (ml + chalkEdge(_v + pl) + chalkText(msg) + chalkEdge(pr + _v) + mr + '\n'),
        lib = (ml + chalkEdge(_v + ' '.repeat(iw) + _v) + mr + '\n').repeat(opts.padding.bottom),
        lb  = (ml + chalkEdge(_bl + _h.repeat(iw) + _br) + mr);

    return mt + lt + lit + lm + lib + lb + mb;

}

module.exports = (msg, inlineOpts) => {

  let opts   = processOpts(inlineOpts),
      output = createOutput(msg, opts);

  console.log(output);

}
