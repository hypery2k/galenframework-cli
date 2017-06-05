// Copyright 2016 Martin Reinhardt

/*
 * This simply downloads Galen
 */

'use strict';

var requestProgress = require('request-progress');
var replace = require('replace-in-file');
var Progress = require('progress');
var AdmZip = require('adm-zip');
var cp = require('child_process');
var fs = require('fs-extra');
var helper = require('./lib/helper');
var kew = require('kew');
var npmconf = require('npmconf');
var path = require('path');
var request = require('request');
var url = require('url');
var which = require('which');
var log = require('npmlog');

var cdnUrl = process.env.npm_config_galen_url ||
  process.env.GALEN_CDNURL ||
  'https://github.com/galenframework/galen/releases/download/';
var downloadUrl = cdnUrl + '/galen-' + helper.version + '/galen-bin-' + helper.version + '.zip';

var originalPath = process.env.PATH;

// If the process exits without going through exit(), then we did not complete.
var validExit = false;

process.on('exit', function () {
  if (!validExit) {
    log.error('Install exited unexpectedly');
    exit(1);
  }
});

// NPM adds bin directories to the path, which will cause `which` to find the
// bin for this package not the actual galenframework bin.  Also help out people who
// put ./bin on their path
process.env.PATH = helper.cleanPath(originalPath);

var libPath = path.join(__dirname, 'lib');
var pkgPath = path.join(libPath, 'galen');
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
    galenPath = result;


    // Horrible hack to avoid problems during global install. We check to see if
    // the file `which` found is our own bin script.
    if (galenPath.indexOf(path.join('npm', 'galenframework')) !== -1) {
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
  .then(function (stdout) {
    var regex = /^Version: ([0-9\.]+)$/
    var result = stdout.trim().match(regex);
    var version = result[1];
    if (helper.version == version) {
      writeLocationFile(galenPath);
      log.info('galenframework is already installed at', galenPath + '.');
      exit(0);
    } else {
      log.info('galenframework detected, but wrong version', stdout.trim(), '@', galenPath + '.');
      downloadAndInstallGalen();
    }
  })
  .fail(downloadAndInstallGalen);


function downloadAndInstallGalen() {
  // Trying to use a local file failed, so initiate download and install
  // steps instead.
  var npmconfDeferred = kew.defer();
  npmconf.load(npmconfDeferred.makeNodeResolver());
  return npmconfDeferred.promise.then(function (conf) {
    tmpPath = findSuitableTempDirectory(conf);

    var fileName = downloadUrl.split('/').pop();
    var downloadedFile = path.join(tmpPath, fileName);

    log.info('Running at platform: ' + process.platform);

    // Start the install.
    if (!fs.existsSync(downloadedFile)) {
      log.info('Downloading', downloadUrl);
      log.info('Saving to', downloadedFile);
      return requestBinary(getRequestOptions(conf), downloadedFile);
    } else {
      log.info('Download already available at', downloadedFile);
      return {
        requestOptions: getRequestOptions(conf),
        downloadedFile: downloadedFile
      };
    }
  })
    .then(function (response) {
      return extractDownload(response.downloadedFile, response.requestOptions, false);
    })
    .then(function (extractedPath) {
      return copyIntoPlace(extractedPath, pkgPath);
    })
    .then(function () {
      var location = libPath;
      writeLocationFile(location);

      log.info('Done. galen binary available at ', location);
      // Ensure executable is executable by all users
      fs.chmodSync(location, '755');
      fs.chmodSync(location + '/galen/galen', '755');
      fs.chmodSync(location + '/galen/galen.bat', '755');
      replace({
        files: location + '/galen/galen.bat',
        replace: 'com.galenframework.GalenMain %*',
        with: 'com.galenframework.GalenMain %* -Djna.nosys=true'
      },
        function (error, changedFiles) {
          //Catch errors
          if (error) {
            log.error('Error occurred:', error);
          }
          //List changed files
          log.info('Modified files:', changedFiles.join(', '));
          exit(0);
        });
    })
    .fail(function (err) {
      log.error('Galen installation failed', err, err.stack);
      exit(1);
    });
}

/**
 * Save the destination directory back
 * @param {string} location - path of the directory
 */
function writeLocationFile(location) {
  log.info('Writing location.js file');
  if (process.platform === 'win32') {
    location = location.replace(/\\/g, '\\\\');
  }
  fs.writeFileSync(path.join(libPath, 'location.js'),
    'module.exports.location = \'' + location + '\';');
}

/**
 * Exit helper function
 * @param {int} code - exit code
 * @function
 */
function exit(code) {
  validExit = true;
  process.env.PATH = originalPath;
  process.exit(code || 0);
}

/**
 * Function to find an writable temp directory
 * @param {object} npmConf - current NPM configuration
 * @returns {string} representing suitable temp directory
 * @function
 */
function findSuitableTempDirectory(npmConf) {
  var now = Date.now();
  var candidateTmpDirs = [
    process.env.TMPDIR || process.env.TEMP || npmConf.get('tmp'),
    path.join(process.cwd(), 'tmp',
      '/tmp')
  ];

  for (var i = 0; i < candidateTmpDirs.length; i++) {
    var candidatePath = path.join(candidateTmpDirs[i], 'galenframework');

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

/**
 * Create request opions object
 * @param {object} conf - current NPM config
 * @returns {{uri: string, encoding: null, followRedirect: boolean, headers: {}, strictSSL: *}}
 * @function
 */
function getRequestOptions(conf) {
  var strictSSL = conf.get('strict-ssl');
  if (process.version == 'v0.10.34') {
    log.info('Node v0.10.34 detected, turning off strict ssl due to https://github.com/joyent/node/issues/8894');
    strictSSL = false;
  }


  var options = {
    uri: downloadUrl,
    encoding: null, // Get response as a buffer
    followRedirect: true, // The default download path redirects to a CDN URL.
    headers: {},
    strictSSL: strictSSL
  };

  var proxyUrl = conf.get('https-proxy') || conf.get('http-proxy') || conf.get('proxy');
  if (proxyUrl) {

    // Print using proxy
    var proxy = url.parse(proxyUrl);
    if (proxy.auth) {
      // Mask password
      proxy.auth = proxy.auth.replace(/:.*$/, ':******');
    }
    log.info('Using proxy ' + url.format(proxy));

    // Enable proxy
    options.proxy = proxyUrl;

    // If going through proxy, use the user-agent string from the npm config
    options.headers['User-Agent'] = conf.get('user-agent');
  }

  // Use certificate authority settings from npm
  var ca = conf.get('ca');
  if (ca) {
    log.info('Using npmconf ca');
    options.ca = ca;
  }

  return options;
}

/**
 * Downloads binary file
 * @param {object} requestOptions - to use for HTTP call
 * @param {string} filePath - download URL
 * @returns {*}
 * @function
 */
function requestBinary(requestOptions, filePath) {
  var deferred = kew.defer();
  var writePath = filePath + '-download-' + Date.now();

  log.info('Receiving...');
  var bar = null;
  requestProgress(request(requestOptions, function (error, response, body) {
    log.info('');
    if (!error && response.statusCode === 200) {
      fs.writeFileSync(writePath, body);
      log.info('Received ' + Math.floor(body.length / 1024) + 'K total.');
      fs.renameSync(writePath, filePath);
      deferred.resolve({
        requestOptions: requestOptions,
        downloadedFile: filePath
      });

    } else if (response) {
      log.error('Error requesting archive.\n' +
        'Status: ' + response.statusCode + '\n' +
        'Request options: ' + JSON.stringify(requestOptions, null, 2) + '\n' +
        'Response headers: ' + JSON.stringify(response.headers, null, 2) + '\n' +
        'Make sure your network and proxy settings are correct.\n\n');
      exit(1);
    } else if (error && error.stack && error.stack.indexOf('SELF_SIGNED_CERT_IN_CHAIN') != -1) {
      log.error('Error making request.');
      exit(1);
    } else if (error) {
      log.error('Error making request.\n' + error.stack + '\n\n' +
        'Please report this full log at https://github.com/hypery2k/galenframework-cli/issues');
      exit(1);
    } else {
      log.error('Something unexpected happened, please report this full ' +
        'log at https://github.com/hypery2k/galenframework-cli/issues');
      exit(1);
    }
  })).on('progress', function (state) {
    if (!bar) {
      bar = new Progress('  [:bar] :percent :etas', { total: state.total, width: 40 });
    }
    bar.curr = state.received;
    bar.tick(0);
  });

  return deferred.promise;
}

/**
 * Extracts the given Archive
 * @param {string} filePath - path of the ZIP archive to extract
 * @param {object} requestOptions - request options for retry attempt
 * @param {boolean} retry - set to true if it's already an retry attempt
 * @returns {*} - path of the extracted archive content
 * @function
 */
function extractDownload(filePath, requestOptions, retry) {
  var deferred = kew.defer();
  // extract to a unique directory in case multiple processes are
  // installing and extracting at once
  var extractedPath = filePath + '-extract-' + Date.now();
  var options = { cwd: extractedPath };

  fs.mkdirsSync(extractedPath, '0777');
  // Make double sure we have 0777 permissions; some operating systems
  // default umask does not allow write by default.
  fs.chmodSync(extractedPath, '0777');

  if (filePath.substr(-4) === '.zip') {
    log.info('Extracting zip contents');

    try {
      var zip = new AdmZip(filePath);
      zip.extractAllTo(extractedPath, true);
      deferred.resolve(extractedPath);
    } catch (err) {
      log.error('Error extracting zip');
      deferred.reject(err);
    }

  } else {
    log.info('Extracting tar contents (via spawned process)');
    cp.execFile('tar', ['jxf', filePath], options, function (err) {
      if (err) {
        if (!retry) {
          log.info('Error during extracting. Trying to download again.');
          fs.unlinkSync(filePath);
          return requestBinary(requestOptions, filePath).then(function (downloadedFile) {
            return extractDownload(downloadedFile, requestOptions, true);
          });
        } else {
          deferred.reject(err);
          log.error('Error extracting archive');
        }
      } else {
        deferred.resolve(extractedPath);
      }
    });
  }
  return deferred.promise;
}

/**
 * Helper function to move folder contents to target directory
 * @param {string} extractedPath - source directory path
 * @param {string} targetPath - target directory path
 * @returns {string} {!Promise.<RESULT>} promise for chaing
 * @function
 */
function copyIntoPlace(extractedPath, targetPath) {
  log.info('Removing', targetPath);
  return kew.nfcall(fs.remove, targetPath).then(function () {
    // Look for the extracted directory, so we can rename it.
    var files = fs.readdirSync(extractedPath);
    for (var i = 0; i < files.length; i++) {
      var file = path.join(extractedPath, files[i]);
      if (fs.statSync(file).isDirectory() && file.indexOf(helper.version) != -1) {
        log.info('Copying extracted folder', file, '->', targetPath);
        return kew.nfcall(fs.move, file, targetPath);
      }
    }

    log.info('Could not find extracted file', files);
    throw new Error('Could not find extracted file');
  });
}
