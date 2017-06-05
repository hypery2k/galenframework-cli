// Copyright 2016 Martin Reinhardt

/*
 * This simply downloads Galen
 */
'use strict';

var cp = require('child_process');
var fs = require('fs-extra');
var helper = require('./lib/helper');
var kew = require('kew');
var npmconf = require('npmconf');
var path = require('path');
var httpreq = require('httpreq');
var which = require('which');
var npmWhich = require('npm-which')(process.cwd());
var log = require('npmlog');

var originalPath = process.env.PATH;

// If the process exits without going through exit(), then we did not complete.
var validExit = false;

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

var galenPath = null;
var tmpPath = null;

// If the user manually installed galen, we want
// to use the existing version.
//
// Do not re-use a manually-installed galen with
// a different version.
//
// Do not re-use an npm-installed galen, because
// that can lead to weird circular dependencies between
// local versions and global versions.
var whichDeferred = kew.defer();
which('galen', whichDeferred.makeNodeResolver());
whichDeferred.promise
  .then(function (result) {
    return installAdditionalDrivers(result);
  })
  .fail(function (err) {
    npmWhich('galen', function (err, result) {
      if (err) {
        log.error('Galen installation failed', err, err.stack);
        exit(1);
      } else {
        return installAdditionalDrivers(result);
      }
    })
  });

function installAdditionalDrivers(galenPath) {
  return kew.defer().promise.then(function () {
    // Horrible hack to avoid problems during global install. We check to see if
    // the file `which` found is our own bin script.
    if (galenPath.indexOf(path.join('npm', 'galenframework-cli')) !== -1) {
      log.info('Looks like an `npm install -g` on windows; unable to check for already installed version.');
      throw new Error('Global install');
    }

    var contents = fs.readFileSync(galenPath, 'utf8');
    if (/NPM_INSTALL_MARKER/.test(contents)) {
      log.info('Looks like an `npm install -g`; unable to check for already installed version.');
      throw new Error('Global install');
    } else {
      var checkVersionDeferred = kew.defer();
      cp.execFile(galenPath, ['--version'], checkVersionDeferred.makeNodeResolver());
      return checkVersionDeferred.promise;
    }
  })
    .then(function () {
      log.info('galenframework-cli detected');
      var npmconfDeferred = kew.defer();
      npmconf.load(npmconfDeferred.makeNodeResolver());
      return npmconfDeferred.promise;
    })
    .then(function (conf) {
      tmpPath = findSuitableTempDirectory(conf);
      var platform = process.platform;
      // offer safari driver installation
      if (platform === 'darwin') {
        var npmconfDeferred = kew.defer();
        npmconf.load(npmconfDeferred.makeNodeResolver());
        npmconfDeferred.promise.then(function () {
          var downloadUrl = process.env.SAFARIDRIVER_CDNURL ||
            'https://selenium-release.storage.googleapis.com/2.48/SafariDriver.safariextz';
          var fileName = downloadUrl.split('/').pop();
          var downloadedFile = path.join(tmpPath, fileName);
          if (!fs.existsSync(downloadedFile)) {
            log.info('Downloading', downloadUrl);
            return requestBinary(downloadUrl, downloadedFile);
          } else {
            log.info('Download already available at', downloadedFile);
            return downloadedFile;
          }
        }).then(function (downloadedFile) {
          // request to open safari extension installation
          var spawn = require('child_process').spawn;
          log.info('Opening file ', downloadedFile);
          spawn('open', [downloadedFile], {
            detached: true
          });
          exit(0);
        }).fail(function (err) {
          log.error('Safari Driver installation failed', err, err.stack);
          exit(1);
        });
      } else {
        exit(0);
      }
    })
})
  }

function exit(code) {
  validExit = true;
  process.env.PATH = originalPath;
  process.exit(code || 0);
}


function findSuitableTempDirectory(npmConf) {
  var now = Date.now();
  var candidateTmpDirs = [
    process.env.TMPDIR || process.env.TEMP || npmConf.get('tmp'),
    '/tmp',
    path.join(process.cwd(), 'tmp')
  ];

  for (var i = 0; i < candidateTmpDirs.length; i++) {
    var candidatePath = path.join(candidateTmpDirs[i], 'galenframework-cli');

    try {
      fs.mkdirsSync(candidatePath, '0777');
      // Make double sure we have 0777 permissions; some operating systems
      // default umask does not allow write by default.
      fs.chmodSync(candidatePath, '0777');
      var testFile = path.join(candidatePath, now + '.tmp');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      return candidatePath;
    } catch (e) {
      log.info(candidatePath, 'is not writable:', e.message);
    }
  }

  log.error('Can not find a writable tmp directory.');
  exit(1);
}


function requestBinary(url, dest) {
  var deferred = kew.defer();
  log.info('Receiving...');

  httpreq.get(url, { binary: true }, function (err, res) {
    if (err) {
      deferred.reject(err);
      log.error('Error making request.');
    } else {
      fs.writeFile(dest, res.body, function (err) {
        if (err) {
          deferred.reject(err);
          log.info('Error writing file');
        } else {
          log.info('Saved to', dest);
          deferred.resolve(dest);
        }
      });
    }
  });
  return deferred.promise;
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
