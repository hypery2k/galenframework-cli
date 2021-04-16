/**
 * functional tests.  Requires internet connection to validate phantom
 * functions correctly.
 */

const fs = require('fs');
const path = require('path');
const helper = require('../lib/helper');

describe("Galen Core", function() {
  var a;

  it("Binary file should have been downloaded", function() {
    const binFileExists = fs.existsSync(helper.path);
    expect(binFileExists).toBeTruthy();
  });

  it("Clean path", function() {
    const binPath1 = helper.cleanPath('/Users/hypery2k/bin:./bin');
    expect(binPath1).toBe('/Users/hypery2k/bin');
    const binPath2 = helper.cleanPath('/Users/hypery2k/bin:./bin:/usr/bin');
    expect(binPath2).toBe('/Users/hypery2k/bin:/usr/bin');
    const binPath3 = helper.cleanPath('./bin:/usr/bin');
    expect(binPath3).toBe('/usr/bin');
    const binPath4 = helper.cleanPath('./bin');
    expect(binPath4).toBe('');
    const binPath5 = helper.cleanPath('/Work/bin:/Work/as/node_modules/.bin:/usr/bin');
    expect(binPath5).toBe('/Work/bin:/usr/bin');
  });
});
