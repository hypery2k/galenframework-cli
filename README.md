# Galenframework commandline helpers

[Galen](http://galenframework.com) allows automated testing of look and feel for your responsive websites.

[![Build Status](https://travis-ci.org/hypery2k/galenframework-cli.svg?branch=master)](https://travis-ci.org/hypery2k/galenframework-cli) [![Build status](https://ci.appveyor.com/api/projects/status/fbwy88pc9ia6429w/branch/master?svg=true)](https://ci.appveyor.com/project/hypery2k/galenframework-cli/branch/master) [![License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE) [![Code Climate](https://codeclimate.com/github/hypery2k/galenframework-cli/badges/gpa.svg)](https://codeclimate.com/github/hypery2k/galenframework-cli)

The [core](core/) module is just the node wrapper for [Galen](http://galenframework.com) and can be used within CI environments

The [cli](cli/) module is a command line module for [Galen](http://galenframework.com). This includes the core above and webdriver downloads for different browsers.

[![Join the chat at https://gitter.im/hypery2k/galenframework-cli](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hypery2k/galenframework-cli?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Bountysource](https://www.bountysource.com/badge/tracker?tracker_id=15642797)](https://www.bountysource.com/trackers/15642797-hypery2k-galenframework-cli?utm_source=15642797&utm_medium=shield&utm_campaign=TRACKER_BADGE) [![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=mreinhardt&url=https://github.com/hypery2k/galenframework-cli&title=badges&language=&tags=github&category=software)

> Feel free to **donate**
> 
> <a href='https://pledgie.com/campaigns/31915'><img alt='Click here to lend your support to: NPM packages and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/31915.png?skin_name=chrome' border='0' ></a>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JYG6LVEHB59TL">
> <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"/>
> </img></a>
> Or donate [Bitcoins](bitcoin:3CNDEGjhbDxGScBtJYMibRNykRH2wXSLY9):
> [![Bitcoin](https://martinreinhardt-online.de/bitcoin.png)](bitcoin:3CNDEGjhbDxGScBtJYMibRNykRH2wXSLY9)
>
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)

##<a name="docker"> Docker

### Usage


```
docker run -v ./test/galen/specs:/var/test_scripts -it galen test ... galenframework/runtime
```
