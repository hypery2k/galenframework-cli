// Copyright 2016 Martin Reinhardt

// This simply downloads Galen

'use strict';

const cp = require('child_process');
const fs = require('fs-extra');
const helper = require('galenframework/lib/helper');
const kew = require('kew');
const npmconf = require('npmconf');
const path = require('path');
const httpreq = require('httpreq');
const which = require('which');
const npmWhich = require('npm-which')(process.cwd());
const log = require('npmlog');

const originalPath = process.env.PATH;

// If the process exits without going through exit(), then we did not complete.
let validExit = false;

process.on('exit', function () {
    if (!validExit) {
        log.info('Install exited unexpectedly');
        exit(1);
    }
});

// NPM adds bin directories to the path, which will cause `which` to find the
// bin for this package not the actual galenframework-cli bin.  Also help out people who
// put ./bin on their path
process.env.PATH = helper.cleanPath(originalPath);

// If the user manually installed galen, we want
// to use the existing version.
//
// Do not re-use a manually-installed galen with
// a different version.
//
// Do not re-use an npm-installed galen, because
// that can lead to weird circular dependencies between
// local versions and global versions.
const whichDeferred = kew.defer();
which('galen', whichDeferred.makeNodeResolver());
whichDeferred.promise
    .then((result) => installAdditionalDrivers(result))
    .fail(() => npmWhich('galen', (err, result) => {
        if (err) {
            log.error('Galen installation failed', err, err.stack);
            exit(1);
        } else {
            return installAdditionalDrivers(result);
        }
    }));

function installAdditionalDrivers(galenPath) {
    const defer = kew.defer();
    defer.resolve();
    defer.promise.then(() => {
        // Horrible hack to avoid problems during global install. We check to see if
        // the file `which` found is our own bin script.
        if (galenPath.indexOf(path.join('npm', 'galenframework-cli')) !== -1) {
            log.info('Looks like an `npm install -g` on windows; unable to check for already installed version.');
            throw new Error('Global install');
        }
        const contents = fs.readFileSync(galenPath, 'utf8');
        if ((/NPM_INSTALL_MARKER/).test(contents)) {
            log.info('Looks like an `npm install -g`; unable to check for already installed version.');
            throw new Error('Global install');
        } else {
            var checkVersionDeferred = kew.defer();
            cp.execFile(galenPath, ['--version'], checkVersionDeferred.makeNodeResolver());

            return checkVersionDeferred.promise;
        }
    }).then(() => {
        log.info('galenframework-cli detected');
        const npmconfDeferred = kew.defer();
        npmconf.load(npmconfDeferred.makeNodeResolver());

return npmconfDeferred.promise;
    })
.then(() => {
        exit(0);
    })
}

function exit(code) {
    validExit = true;
    process.env.PATH = originalPath;
    process.exit(code || 0);
}


if (process.platform === 'darwin') {
    console.info('\n\nTo \x1b[4menable CLI tab autocompletion\x1b[0m run: \n' +
        ' \x1b[7mgalen completion >> ~/.profile\x1b[0m ' +
        '\n\n');
}
if (process.platform === 'linux') {
    console.info('\n\nTo \x1b[4menable CLI tab autocompletion\x1b[0m run: \n' +
        ' \x1b[7mgalen completion >> ~/.bashrc\x1b[0m \n' +
        'or\n' +
        ' \x1b[7mgalen completion >> .~/.zshrc\x1b[0m ' +
        '\n\n');
}
