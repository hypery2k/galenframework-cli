/**
 * @fileoverview Helpers made available via require('helper') once package is
 * installed.
 */

var fs = require('fs'),
    path = require('path');


/**
 * Where the phantom binary can be found.
 * @type {string}
 */
try {
    exports.path = path.resolve(__dirname, require('./location').location);
} catch (e) {
    // Must be running inside install script.
    exports.path = null;
}


/**
 * The version of Galen installed by this package.
 * @type {number}
 */
exports.version = require('../package.json')._galenVersion;


/**
 * Returns a clean path that helps avoid `which` finding bin files installed
 * by NPM for this repo.
 * @param {string} path
 * @return {string}
 */
exports.cleanPath = function(path) {
    'use strict';

    return path
        .replace(/:[^:]*node_modules[^:]*/g, '')
        .replace(/(^|:)\.\/bin(:|$)/g, ':')
        .replace(/^:+/, '')
        .replace(/:+$/, '');
};


// Make sure the binary is executable.  For some reason doing this inside
// install does not work correctly, likely due to some NPM step.
if (exports.path) {
    try {
        // avoid touching the binary if it's already got the correct permissions
        var st = fs.statSync(exports.path);
        var mode = st.mode | 0555; // eslint-disable-line no-octal
        if (mode !== st.mode) {
            fs.chmodSync(exports.path, mode);
        }
    } catch (e) {
        // Just ignore error if we don't have permission.
        // We did our best. Likely because phantomjs was already installed.
    }
}

exports.galenPath = function() {
    return new Promise(function(resolve, reject) {

        var galenPath = path.resolve(__dirname + '/../node_modules/galenframework/bin/galen' + (process.platform === 'win32' ? '.cmd' : ''));
        fs.stat(galenPath, function(err) {
            // resolve for NPM3+
            if (err) {
                galenPath = path.resolve(__dirname + '/../../galenframework/bin/galen' + (process.platform === 'win32' ? '.cmd' : ''));
                fs.stat(galenPath, function(err) {
                    // resolve for NPM3+
                    if (err) {
                        reject('Cannot find Galenframework at ' + galenPath);
                    } else {
                        resolve(galenPath);
                    }
                });
            } else {
                resolve(galenPath);
            }
        });
    });
}