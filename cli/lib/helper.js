var path = require('path');

/**
 * Returns a clean path that helps avoid `which` finding bin files installed
 * by NPM for this repo.
 * @param {string} path
 * @return {string}
 */
exports.cleanPath = function (path) {
  'use strict';

  return path
    .replace(/:[^:]*node_modules[^:]*/g, '')
    .replace(/(^|:)\.\/bin(\:|$)/g, ':')
    .replace(/^:+/, '')
    .replace(/:+$/, '');
};
