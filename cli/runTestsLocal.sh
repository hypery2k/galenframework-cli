#!/bin/bash

cd ../test
../node_modules/.bin/galen check specs/bootstrap.gspec --url "http://getbootstrap.com" --size "640x480" --htmlreport ../../../reports/
../node_modules/.bin/galen test galen.test -DwebsiteUrl="http://getbootstrap.com"
