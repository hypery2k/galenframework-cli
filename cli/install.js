// Copyright 2015 Martin Reinhardt

/*
 * This simply downloads Galen
 */

'use strict';

var requestProgress = require('request-progress');
var progress = require('progress');
var AdmZip = require('adm-zip');
var cp = require('child_process');
var fs = require('fs-extra');
var helper = require('./lib/helper');
var kew = require('kew');
var npmconf = require('npmconf');
var path = require('path');
var request = require('request');
var url = require('url');
var util = require('util');
var which = require('which');

var cdnUrl = process.env.npm_config_galen_url || process.env.GALEN_CDNURL || 'https://github.com/galenframework/galen/releases/download/';
var downloadUrl = cdnUrl + '/galen-' + helper.version + '/galen-bin-' + helper.version + '.zip';

var originalPath = process.env.PATH;

// If the process exits without going through exit(), then we did not complete.
var validExit = false;

process.on('exit', function () {
  if (!validExit) {
    console.log('Install exited unexpectedly');
    exit(1);
  }
});

// NPM adds bin directories to the path, which will cause `which` to find the
// bin for this package not the actual galenframework-cli bin.  Also help out people who
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
    if (galenPath.indexOf(path.join('npm', 'galenframework-cli')) !== -1) {
      console.log('Looks like an `npm install -g` on windows; unable to check for already installed version.');
      throw new Error('Global install');
    }

    var contents = fs.readFileSync(galenPath, 'utf8');
    if (/NPM_INSTALL_MARKER/.test(contents)) {
      console.log('Looks like an `npm install -g`; unable to check for already installed version.');
      throw new Error('Global install');
    } else {
      var checkVersionDeferred = kew.defer();
      cp.execFile(galenPath, ['--version'], checkVersionDeferred.makeNodeResolver());
      return checkVersionDeferred.promise;
    }
  })
  .then(function (stdout) {
    var version = stdout.trim();
    if (helper.version == version) {
      writeLocationFile(galenPath);
      console.log('galenframework-cli is already installed at', galenPath + '.');
      exit(0);

    } else {
      console.log('galenframework-cli detected, but wrong version', stdout.trim(), '@', galenPath + '.');
      throw new Error('Wrong version');
    }
  })
  .fail(function (err) {
    // Trying to use a local file failed, so initiate download and install
    // steps instead.
    var npmconfDeferred = kew.defer();
    npmconf.load(npmconfDeferred.makeNodeResolver());
    return npmconfDeferred.promise;
  })
  .then(function (conf) {
    tmpPath = findSuitableTempDirectory(conf);

    var fileName = downloadUrl.split('/').pop();
    var downloadedFile = path.join(tmpPath, fileName);

    console.log('Running at platform: ' + process.platform);

    // Start the install.
    if (!fs.existsSync(downloadedFile)) {
      console.log('Downloading', downloadUrl);
      console.log('Saving to', downloadedFile);
      return requestBinary(getRequestOptions(conf), downloadedFile);
    } else {
      console.log('Download already available at', downloadedFile);
      return downloadedFile;
    }
  })
  .then(function (downloadedFile) {
    return extractDownload(downloadedFile);
  })
  .then(function (extractedPath) {
    return copyIntoPlace(extractedPath, pkgPath);
  })
  .then(function () {
    var location = libPath;
    writeLocationFile(location);

    console.log('Done. galen binary available at ', location);
    // Ensure executable is executable by all users
    fs.chmodSync(location, '755');
    fs.chmodSync(libPath + '/galen/galen', '755');
    fs.chmodSync(libPath + '/galen/galen.bat', '755');

    var platform = process.platform
    // offer safari driver installation
    if (platform === 'darwin') {
      var npmconfDeferred = kew.defer();
      npmconf.load(npmconfDeferred.makeNodeResolver());
      npmconfDeferred.promise.then(function (conf) {
        var downloadUrl = process.env.SAFARIDRIVER_CDNURL || 'http://selenium-release.storage.googleapis.com/2.45/SafariDriver.safariextz';
        var fileName = downloadUrl.split('/').pop();
        var downloadedFile = path.join(tmpPath, fileName);
        if (!fs.existsSync(downloadedFile)) {
          console.log('Downloading', downloadUrl);
          console.log('Saving to', downloadedFile);
          return requestBinary(getRequestOptions(conf), downloadedFile);
        } else {
          console.log('Download already available at', downloadedFile);
          return downloadedFile;
        }
      }).then(function (downloadedFile) {
        // request to open safari extension installation
        var spawn = require('child_process').spawn
        spawn('open', [downloadedFile]);
        exit(0);
      }).fail(function (err) {
        console.error('Safari Driver installation failed', err, err.stack);
        exit(1);
      });
    } else {
      exit(0);
    }
  })
  .fail(function (err) {
    console.error('Galen installation failed', err, err.stack);
    exit(1);
  });


function writeLocationFile(location) {
  console.log('Writing location.js file');
  if (process.platform === 'win32') {
    location = location.replace(/\\/g, '\\\\')
  }
  fs.writeFileSync(path.join(libPath, 'location.js'),
    'module.exports.location = \'' + location + '\';')
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
      console.log(candidatePath, 'is not writable:', e.message);
    }
  }

  console.error('Can not find a writable tmp directory.');
  exit(1);
}


function getRequestOptions(conf) {
  var strictSSL = conf.get('strict-ssl');
  if (process.version == 'v0.10.34') {
    console.log('Node v0.10.34 detected, turning off strict ssl due to https://github.com/joyent/node/issues/8894');
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
    console.log('Using proxy ' + url.format(proxy));

    // Enable proxy
    options.proxy = proxyUrl;

    // If going through proxy, use the user-agent string from the npm config
    options.headers['User-Agent'] = conf.get('user-agent');
  }

  // Use certificate authority settings from npm
  var ca = conf.get('ca');
  if (ca) {
    console.log('Using npmconf ca');
    options.ca = ca;
  }

  return options;
}


function requestBinary(requestOptions, filePath) {
  var deferred = kew.defer();

  var count = 0;
  var notifiedCount = 0;
  var writePath = filePath + '-download-' + Date.now();

  console.log('Receiving...');
  var bar = null;
  requestProgress(request(requestOptions, function (error, response, body) {
    console.log('');
    if (!error && response.statusCode === 200) {
      fs.writeFileSync(writePath, body);
      console.log('Received ' + Math.floor(body.length / 1024) + 'K total.');
      fs.renameSync(writePath, filePath);
      deferred.resolve(filePath);

    } else if (response) {
      console.error('Error requesting archive.\n' +
        'Status: ' + response.statusCode + '\n' +
        'Request options: ' + JSON.stringify(requestOptions, null, 2) + '\n' +
        'Response headers: ' + JSON.stringify(response.headers, null, 2) + '\n' +
        'Make sure your network and proxy settings are correct.\n\n');
      exit(1);
    } else if (error && error.stack && error.stack.indexOf('SELF_SIGNED_CERT_IN_CHAIN') != -1) {
      console.error('Error making request.');
      exit(1);
    } else if (error) {
      console.error('Error making request.\n' + error.stack + '\n\n' +
        'Please report this full log at https://github.com/hypery2k/galenframework/issues');
      exit(1);
    } else {
      console.error('Something unexpected happened, please report this full ' +
        'log at https://github.com/hypery2k/galenframework/issues');
      exit(1);
    }
  })).on('progress', function (state) {
    if (!bar) {
      bar = new progress('  [:bar] :percent :etas', {total: state.total, width: 40});
    }
    bar.curr = state.received;
    bar.tick(0);
  });

  return deferred.promise;
}


function extractDownload(filePath) {
  var deferred = kew.defer();
  // extract to a unique directory in case multiple processes are
  // installing and extracting at once
  var extractedPath = filePath + '-extract-' + Date.now();
  var options = {cwd: extractedPath};

  fs.mkdirsSync(extractedPath, '0777');
  // Make double sure we have 0777 permissions; some operating systems
  // default umask does not allow write by default.
  fs.chmodSync(extractedPath, '0777');

  if (filePath.substr(-4) === '.zip') {
    console.log('Extracting zip contents');

    try {
      var zip = new AdmZip(filePath);
      zip.extractAllTo(extractedPath, true);
      deferred.resolve(extractedPath);
    } catch (err) {
      console.error('Error extracting zip');
      deferred.reject(err);
    }

  } else {
    console.log('Extracting tar contents (via spawned process)');
    cp.execFile('tar', ['jxf', filePath], options, function (err, stdout, stderr) {
      if (err) {
        console.error('Error extracting archive');
        deferred.reject(err);
      } else {
        deferred.resolve(extractedPath);
      }
    })
  }
  return deferred.promise
}


function copyIntoPlace(extractedPath, targetPath) {
  console.log('Removing', targetPath);
  return kew.nfcall(fs.remove, targetPath).then(function () {
    // Look for the extracted directory, so we can rename it.
    var files = fs.readdirSync(extractedPath);
    for (var i = 0; i < files.length; i++) {
      var file = path.join(extractedPath, files[i]);
      if (fs.statSync(file).isDirectory() && file.indexOf(helper.version) != -1) {
        console.log('Copying extracted folder', file, '->', targetPath);
        return kew.nfcall(fs.move, file, targetPath);
      }
    }

    console.log('Could not find extracted file', files);
    throw new Error('Could not find extracted file');
  })
}