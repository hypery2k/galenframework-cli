# Galenframework commandline helpers

[Galen](http://galenframework.com) allows automated testing of look and feel for your responsive websites.

[![Build Status](https://travis-ci.org/hypery2k/galenframework-cli.svg?branch=master)](https://travis-ci.org/hypery2k/galenframework-cli) [![Build status](https://ci.appveyor.com/api/projects/status/fbwy88pc9ia6429w/branch/master?svg=true)](https://ci.appveyor.com/project/hypery2k/galenframework-cli/branch/master) [![License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE) [![Code Climate](https://codeclimate.com/github/hypery2k/galenframework-cli/badges/gpa.svg)](https://codeclimate.com/github/hypery2k/galenframework-cli)

The [core](core/) module is just the node wrapper for [Galen](http://galenframework.com) and can be used within CI environments

[![Known Vulnerabilities](https://snyk.io/test/github/hypery2k/galenframework-cli/badge.svg?targetFile=core%2Fpackage.json)](https://snyk.io/test/github/hypery2k/galenframework-cli?targetFile=core%2Fpackage.json)

The [cli](cli/) module is a command line module for [Galen](http://galenframework.com). This includes the core above and webdriver downloads for different browsers. You can also use the [docker image](https://hub.docker.com/r/galenframework/cli/) for easier setup.

[![Known Vulnerabilities](https://snyk.io/test/github/hypery2k/galenframework-cli/badge.svg?targetFile=cli%2Fpackage.json)](https://snyk.io/test/github/hypery2k/galenframework-cli?targetFile=cli%2Fpackage.json) [![Docker Build Status](https://img.shields.io/docker/build/galenframework/cli.svg)](https://hub.docker.com/r/galenframework/cli/)

[![Join the chat at https://gitter.im/hypery2k/galenframework-cli](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hypery2k/galenframework-cli?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Bountysource](https://www.bountysource.com/badge/tracker?tracker_id=15642797)](https://www.bountysource.com/trackers/15642797-hypery2k-galenframework-cli?utm_source=15642797&utm_medium=shield&utm_campaign=TRACKER_BADGE) [![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=mreinhardt&url=https://github.com/hypery2k/galenframework-cli&title=badges&language=&tags=github&category=software)

<a name="donation"></a>
> Feel free to **donate**
>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=H8TR8246RCDJG">
> <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/>
> </img></a>
> Or donate Bitcoins: bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D
>
> [![Bitcoin](https://martinreinhardt-online.de/bitcoin.png)](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D)
>
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)

##<a name="docker"> Docker

### Usage


```
docker run -v $(pwd)/galenframework-cli/core/test/:/var/test_scripts galenframework/cli galen test /var/test_scripts/...
```
