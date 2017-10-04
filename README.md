# Galenframework commandline helpers

[Galen](http://galenframework.com) allows automated testing of look and feel for your responsive websites.

[![Build Status](https://travis-ci.org/hypery2k/galenframework-cli.svg?branch=master)](https://travis-ci.org/hypery2k/galenframework-cli) [![Build status](https://ci.appveyor.com/api/projects/status/fbwy88pc9ia6429w/branch/master?svg=true)](https://ci.appveyor.com/project/hypery2k/galenframework-cli/branch/master) [![License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE) [![Code Climate](https://codeclimate.com/github/hypery2k/galenframework-cli/badges/gpa.svg)](https://codeclimate.com/github/hypery2k/galenframework-cli)

The [core](core/) module is just the node wrapper for [Galen](http://galenframework.com) and can be used within CI environments

The [cli](cli/) module is a command line module for [Galen](http://galenframework.com). This includes the core above and webdriver downloads for different browsers.

[![Join the chat at https://gitter.im/hypery2k/galenframework-cli](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hypery2k/galenframework-cli?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Bountysource](https://www.bountysource.com/badge/tracker?tracker_id=15642797)](https://www.bountysource.com/trackers/15642797-hypery2k-galenframework-cli?utm_source=15642797&utm_medium=shield&utm_campaign=TRACKER_BADGE) [![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=mreinhardt&url=https://github.com/hypery2k/galenframework-cli&title=badges&language=&tags=github&category=software)

##<a name="docker"> Docker

### Usage


```
docker run -v ./test/galen/specs:/var/test_scripts -it galen test ... galenframework/runtime
```
