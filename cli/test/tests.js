/**
 * Nodeunit functional tests.  Requires internet connection to validate phantom
 * functions correctly.
 */

var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var helper = require('galenframework/lib/helper');

exports.testCleanPath = function(test) {
    test.expect(5);
    test.equal('/Users/hypery2k/bin', helper.cleanPath('/Users/hypery2k/bin:./bin'));
    test.equal('/Users/hypery2k/bin:/usr/bin', helper.cleanPath('/Users/hypery2k/bin:./bin:/usr/bin'));
    test.equal('/usr/bin', helper.cleanPath('./bin:/usr/bin'));
    test.equal('', helper.cleanPath('./bin'));
    test.equal('/Work/bin:/usr/bin', helper.cleanPath('/Work/bin:/Work/as/node_modules/.bin:/usr/bin'));
    test.done();
};