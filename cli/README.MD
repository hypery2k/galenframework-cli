# Galenframework CLI

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[![npm version](https://badge.fury.io/js/galenframework-cli.svg)](http://badge.fury.io/js/galenframework-cli)
[![Dependency Status](https://david-dm.org/hypery2k/galenframework-cli.svg)](https://david-dm.org/hypery2k/galenframework-cli) [![devDependency Status](https://david-dm.org/hypery2k/galenframework-cli/dev-status.svg)](https://david-dm.org/hypery2k/galenframework-cli#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/hypery2k/galenframework-cli/badge.svg?branch=master&service=github)](https://coveralls.io/github/hypery2k/galenframework-cli?branch=master)


[Galen](http://galenframework.com) allows automated testing of look and feel for your responsive websites.

> The command line tool to use [Galen](http://galenframework.com). This includes the wrapper above and webdriver downloads for different browsers
[![NPM](https://nodei.co/npm/galenframework-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/galenframework-cli/)

> Feel free to **donate**
>
> <a href='https://pledgie.com/campaigns/31915'><img alt='Click here to lend your support to: NPM packages and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/31915.png?skin_name=chrome' border='0' ></a>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JYG6LVEHB59TL">
> <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"/>
> </img></a>
> Or donate [Bitcoins](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D):
> [![Bitcoin](https://martinreinhardt-online.de/bitcoin.png)](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D)
>
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)


## Installation

You must have Java 6+ installed.

> (sudo) npm install -g galenframework-cli

Or the develop build, which maybe **not be stable**

> (sudo) npm install -g galenframework-cli@next

If you want to enable tab completion on Linux, run

> galen completion >> ~/.~/.bashrc
or
> galen completion >> ~/.~/.zshrc

On Mac OS X, run
> galen completion >> ~/.~/.profile

In case of errors within Ubuntu/Debian, e.g.
```
sh: 1: node: not find
```

Then you need to install  nodejs-legacy:
> (sudo) apt-get install nodejs-legacy

## Advanced Usage

### Debugging

If you need to debug the tests use the node-inspector:
```
NODE_DEBUG=galen node --debug-brk node_modules/galenframework-cli/bin/galen
node-inspector --web-port=8282
```

You can then open chrome at *http://127.0.0.1:8282/?port=5858* for debugging.

If you want to have verbose logging add NODE_DEBUG=galen:

```
NODE_DEBUG=galen node --debug-brk node_modules/galenframework-cli/bin/galen
```

## Author

[Martin Reinhardt](https://github.com/hypery2k)

![Martin Reinhardt](https://s.gravatar.com/avatar/9fa901119c90e051cd6a84ca26c99043?size=496&amp;default=retro)

Thanks for Obvious and their PhantomJS project for heavy inspiration! Check their project on [Github](https://github.com/Obvious/phantomjs).
