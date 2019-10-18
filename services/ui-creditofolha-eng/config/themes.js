/*eslint-disable */
'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

const ignoredThemes = ['']
const themeFileNames = fs.readdirSync(paths.appThemes).filter(file => ignoredThemes.indexOf(file) < 0);

function getThemeName(fileName) {
  return `${path.basename(fileName, path.extname(fileName))}`.replace('_', '');
}

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

const entryPoints = themeFileNames.reduce((entry, theme) => {
  const name = getThemeName(theme)
  return {
    ...entry,
    [name]: path.resolve(paths.appThemes, theme),
  }
}, {});


const cacheGroups = themeFileNames.reduce((cg, theme) => {
  const name = getThemeName(theme)
  return {
    ...cg,
    [name]: {
      name: name,
      test: (m,c,entry = name) => m.constructor.name === 'CssModule' && recursiveIssuer(m) === name,
      chunks: 'all',
      enforce: true
    },
  }
}, {});

module.exports = {
  entryPoints,
  cacheGroups,
}