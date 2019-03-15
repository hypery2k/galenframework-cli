## [2.4.4](https://github.com/hypery2k/galenframework-cli/compare/v2.4.3...v2.4.4) (2019-03-15)


### Bug Fixes

* **Geckodriver:** Use newer version ([30e790c](https://github.com/hypery2k/galenframework-cli/commit/30e790c))


### Features

* **Galen:** Use latest Galen version ([df0eefb](https://github.com/hypery2k/galenframework-cli/commit/df0eefb))
* **Galen:** Use latest Galen version ([c676fc5](https://github.com/hypery2k/galenframework-cli/commit/c676fc5))



## [2.4.3](https://github.com/hypery2k/galenframework-cli/compare/v2.4.2...v2.4.3) (2019-02-18)


### Features

* **Docker:** Proper labels for docker runtime ([db5aec1](https://github.com/hypery2k/galenframework-cli/commit/db5aec1))
* **Galen:** Use latest Galen version ([5a3c61a](https://github.com/hypery2k/galenframework-cli/commit/5a3c61a))
* **Security:** Resolve security alerts ([667e898](https://github.com/hypery2k/galenframework-cli/commit/667e898))
* **Webdriver:** Use latest chromedriver and pin geckodriver ([99cb4af](https://github.com/hypery2k/galenframework-cli/commit/99cb4af))



## [2.4.2](https://github.com/hypery2k/galenframework-cli/compare/v2.4.1...v2.4.2) (2019-01-31)


### Bug Fixes

* **Build:** Disable coverage check on Windows CI build ([afa5c2b](https://github.com/hypery2k/galenframework-cli/commit/afa5c2b))
* **Build:** Ignore cc-report error code ([04b6a39](https://github.com/hypery2k/galenframework-cli/commit/04b6a39))
* **CI:** Disable git autocrlf ([343b392](https://github.com/hypery2k/galenframework-cli/commit/343b392))
* **Windows:** Use supported NodeJS version on Win CI build ([b820eb9](https://github.com/hypery2k/galenframework-cli/commit/b820eb9)), closes [#62](https://github.com/hypery2k/galenframework-cli/issues/62)


### Features

* **CodeQuality:** Adding codeclimate support ([e14606c](https://github.com/hypery2k/galenframework-cli/commit/e14606c))
* **Galen:** Use latest Galen version ([0934523](https://github.com/hypery2k/galenframework-cli/commit/0934523))
* **Safari:** Drop Safari extentsion installation ([0317629](https://github.com/hypery2k/galenframework-cli/commit/0317629))
* **Webdriver:** Update geckodriver and chromedriver ([b13d3df](https://github.com/hypery2k/galenframework-cli/commit/b13d3df))


### BREAKING CHANGES

* **Safari:** No legacy safari  webdriver extension for Selenium



## [2.4.1](https://github.com/hypery2k/galenframework-cli/compare/v2.4.0...v2.4.1) (2018-12-23)


### Features

* **Galen:** Use latest Galen version ([8a068a8](https://github.com/hypery2k/galenframework-cli/commit/8a068a8))



# [2.4.0](https://github.com/hypery2k/galenframework-cli/compare/v2.3.7...v2.4.0) (2018-11-04)


### Bug Fixes

* **build:** Disable failing checks for now ([55f1f59](https://github.com/hypery2k/galenframework-cli/commit/55f1f59))
* **Build:** Disable coverage ([d7a776b](https://github.com/hypery2k/galenframework-cli/commit/d7a776b))
* **Build:** Disable coverage for now ([c62b83e](https://github.com/hypery2k/galenframework-cli/commit/c62b83e))
* **Docker:** Corrected docker path run error ([420a5a8](https://github.com/hypery2k/galenframework-cli/commit/420a5a8)), closes [#60](https://github.com/hypery2k/galenframework-cli/issues/60)
* **security:** Overwrite version to overcome vulnerabilities ([e01cced](https://github.com/hypery2k/galenframework-cli/commit/e01cced))
* cli/package.json to reduce vulnerabilities ([5b496ce](https://github.com/hypery2k/galenframework-cli/commit/5b496ce))
* core/package.json to reduce vulnerabilities ([7f20753](https://github.com/hypery2k/galenframework-cli/commit/7f20753))
* core/package.json to reduce vulnerabilities ([04308b1](https://github.com/hypery2k/galenframework-cli/commit/04308b1))
* **Security:** Corrected dependencies for adm-zip ([e8cd733](https://github.com/hypery2k/galenframework-cli/commit/e8cd733))
* **Security:** Use new lodash to solve dependency issues ([5df0d34](https://github.com/hypery2k/galenframework-cli/commit/5df0d34))
* **Tests:** Corrected test run ([06f28ea](https://github.com/hypery2k/galenframework-cli/commit/06f28ea))


### Features

* **Docker:** Use NodeJS in Docker ([ea647c4](https://github.com/hypery2k/galenframework-cli/commit/ea647c4))
* **Galen:** Use Galen version 2.4.0 ([5d153bf](https://github.com/hypery2k/galenframework-cli/commit/5d153bf))
* **Galen:** Use latest Galen version ([cdbb474](https://github.com/hypery2k/galenframework-cli/commit/cdbb474))
* **nodejs:** Drop older NodeJS support ([0b568ad](https://github.com/hypery2k/galenframework-cli/commit/0b568ad))
* **NodeJS:** Drop support for older NodeJS versions ([0286768](https://github.com/hypery2k/galenframework-cli/commit/0286768))
* **Security:** Drop insecure nsp package in favour to `npm audit` ([318be32](https://github.com/hypery2k/galenframework-cli/commit/318be32))
* **Security:** Resolve vulnerabilities ([4725410](https://github.com/hypery2k/galenframework-cli/commit/4725410))


### Reverts

* **CLI:** disable eslint tests ([608ce44](https://github.com/hypery2k/galenframework-cli/commit/608ce44))


### BREAKING CHANGES

* **NodeJS:** Neede NodeJS 8+ from now on!
* **nodejs:** Only support most recent NodeJS runtimes



## [2.3.7](https://github.com/hypery2k/galenframework-cli/compare/v2.3.6...v2.3.7) (2018-05-26)


### Bug Fixes

* cli/package.json & cli/.snyk to reduce vulnerabilities ([d0328b6](https://github.com/hypery2k/galenframework-cli/commit/d0328b6))
* **docker:** Basic docker integration ([d332566](https://github.com/hypery2k/galenframework-cli/commit/d332566)), closes [#49](https://github.com/hypery2k/galenframework-cli/issues/49)
* **nodejs:** Resolve nodejs errors ([a564c7f](https://github.com/hypery2k/galenframework-cli/commit/a564c7f)), closes [#51](https://github.com/hypery2k/galenframework-cli/issues/51)


### Features

* **docker:** Adding Chrome and Firefox to Docker image ([d50f07c](https://github.com/hypery2k/galenframework-cli/commit/d50f07c)), closes [#49](https://github.com/hypery2k/galenframework-cli/issues/49)
* **docker:** Basic CI for Docker ([c845838](https://github.com/hypery2k/galenframework-cli/commit/c845838)), closes [#49](https://github.com/hypery2k/galenframework-cli/issues/49)
* **docker:** Fix Docker build issues ([bf4a4d3](https://github.com/hypery2k/galenframework-cli/commit/bf4a4d3)), closes [#49](https://github.com/hypery2k/galenframework-cli/issues/49)
* **Galen:** Use newer Galen Version 2.3.7 ([2a3c53d](https://github.com/hypery2k/galenframework-cli/commit/2a3c53d))
* **security:** Enable security checks ([4e1a449](https://github.com/hypery2k/galenframework-cli/commit/4e1a449))



## [2.3.6](https://github.com/hypery2k/galenframework-cli/compare/v2.3.5...v2.3.6) (2017-12-15)


### Bug Fixes

* **windows:** Resolve windows runtime error ([bca7ed8](https://github.com/hypery2k/galenframework-cli/commit/bca7ed8))


### Features

* **auto-update-webdriver:** Enable auto update for chromedriver and geckodriver ([#48](https://github.com/hypery2k/galenframework-cli/issues/48)) ([0ab4b1e](https://github.com/hypery2k/galenframework-cli/commit/0ab4b1e))
* **docker:** Create Docker image ([694998d](https://github.com/hypery2k/galenframework-cli/commit/694998d))
* **galen:** Update Galen Version ([20fab19](https://github.com/hypery2k/galenframework-cli/commit/20fab19))



## [2.3.5](https://github.com/hypery2k/galenframework-cli/compare/v2.3.4...v2.3.5) (2017-09-07)


### Bug Fixes

* **package:** update chromedriver to version 2.31.0 ([6188fd8](https://github.com/hypery2k/galenframework-cli/commit/6188fd8))


### Features

* **debugging:** Adding debugging feature ([1856ccb](https://github.com/hypery2k/galenframework-cli/commit/1856ccb)), closes [#13](https://github.com/hypery2k/galenframework-cli/issues/13) [#46](https://github.com/hypery2k/galenframework-cli/issues/46)
* **debugging:** Adding debugging feature ([510f8ec](https://github.com/hypery2k/galenframework-cli/commit/510f8ec)), closes [#13](https://github.com/hypery2k/galenframework-cli/issues/13) [#46](https://github.com/hypery2k/galenframework-cli/issues/46)



## [2.3.4](https://github.com/hypery2k/galenframework-cli/compare/v2.3.3...v2.3.4) (2017-06-14)


### Bug Fixes

* **install-error:** Disable node resolver ([#44](https://github.com/hypery2k/galenframework-cli/issues/44)) ([fe3124b](https://github.com/hypery2k/galenframework-cli/commit/fe3124b))
* **install-error:** see [#44](https://github.com/hypery2k/galenframework-cli/issues/44) ([229abb0](https://github.com/hypery2k/galenframework-cli/commit/229abb0))
* **local-install-error:** [#44](https://github.com/hypery2k/galenframework-cli/issues/44) ([9037f36](https://github.com/hypery2k/galenframework-cli/commit/9037f36))
* **local-install-error:** [#44](https://github.com/hypery2k/galenframework-cli/issues/44) ([e7b0503](https://github.com/hypery2k/galenframework-cli/commit/e7b0503))


### Features

* **Galen-Update:** Use Galen Framework 2.3.4 ([68e86e4](https://github.com/hypery2k/galenframework-cli/commit/68e86e4))
* **Galen-Update:** Use Galen Framework 2.3.4 ([8741adc](https://github.com/hypery2k/galenframework-cli/commit/8741adc))



## [2.3.3](https://github.com/hypery2k/galenframework-cli/compare/v2.3.2...v2.3.3) (2017-04-03)


### Features

* **galen-update:** Use newer galen ([48a797a](https://github.com/hypery2k/galenframework-cli/commit/48a797a))
* **galen-update:** Use newer galen ([b5109c6](https://github.com/hypery2k/galenframework-cli/commit/b5109c6))
* **galen-update:** Use newer galen core module ([cfc3008](https://github.com/hypery2k/galenframework-cli/commit/cfc3008))
* **webdriver:** Support geckodriver ([16635ad](https://github.com/hypery2k/galenframework-cli/commit/16635ad))
* **webdriver:** Use newer webdriver ([a14fc6c](https://github.com/hypery2k/galenframework-cli/commit/a14fc6c))



## [2.3.2](https://github.com/hypery2k/galenframework-cli/compare/v2.3.1...v2.3.2) (2016-11-21)


### Features

* **galen:** Update to recent galen version ([dd80b7b](https://github.com/hypery2k/galenframework-cli/commit/dd80b7b))
* **galen:** Update to recent galen version ([852b601](https://github.com/hypery2k/galenframework-cli/commit/852b601))



# [2.3.0](https://github.com/hypery2k/galenframework-cli/compare/v2.2.6...v2.3.0) (2016-07-14)



## [2.2.6](https://github.com/hypery2k/galenframework-cli/compare/v2.2.5...v2.2.6) (2016-07-09)



## [2.2.2](https://github.com/hypery2k/galenframework-cli/compare/v2.2.1...v2.2.2) (2016-03-01)



## [2.2.1](https://github.com/hypery2k/galenframework-cli/compare/v2.2.0...v2.2.1) (2015-12-15)



# [2.2.0](https://github.com/hypery2k/galenframework-cli/compare/v2.1.3...v2.2.0) (2015-12-06)



## [2.1.3](https://github.com/hypery2k/galenframework-cli/compare/v2.1.2...v2.1.3) (2015-11-23)



## [2.1.2](https://github.com/hypery2k/galenframework-cli/compare/v2.1.1...v2.1.2) (2015-10-03)



## [2.1.1](https://github.com/hypery2k/galenframework-cli/compare/v2.1.0...v2.1.1) (2015-10-03)



# [2.1.0](https://github.com/hypery2k/galenframework-cli/compare/v2.0.10...v2.1.0) (2015-09-24)



## [2.0.10](https://github.com/hypery2k/galenframework-cli/compare/v2.0.9...v2.0.10) (2015-09-21)



## [2.0.9](https://github.com/hypery2k/galenframework-cli/compare/v2.0.8...v2.0.9) (2015-09-14)



## [2.0.8](https://github.com/hypery2k/galenframework-cli/compare/v2.0.7...v2.0.8) (2015-08-27)



## [2.0.7](https://github.com/hypery2k/galenframework-cli/compare/v2.0.6...v2.0.7) (2015-08-14)



## [2.0.6](https://github.com/hypery2k/galenframework-cli/compare/v2.0.5...v2.0.6) (2015-08-12)



## [2.0.5](https://github.com/hypery2k/galenframework-cli/compare/v2.0.4...v2.0.5) (2015-08-04)



## [2.0.4](https://github.com/hypery2k/galenframework-cli/compare/v2.0.3...v2.0.4) (2015-08-03)



## [1.6.4](https://github.com/hypery2k/galenframework-cli/compare/v1.6.3...v1.6.4) (2015-06-17)



## [1.6.3](https://github.com/hypery2k/galenframework-cli/compare/v1.6.2...v1.6.3) (2015-05-03)



## 1.6.2 (2015-04-24)



