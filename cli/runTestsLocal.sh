#!/bin/bash

cd ../test
../tmp/node_modules/.bin/galen check specs/bootstrap.gspec --url "http://getbootstrap.com" --size "640x480" --htmlreport ../../../reports/
../tmp/node_modules/.bin/galen test galen.test -DwebsiteUrl="http://getbootstrap.com"
