cd test
galen check specs/bootstrap.gspec --url "http://getbootstrap.com" --size "640x480" --htmlreport ../../../reports/
galen test galen.test -DwebsiteUrl="http://getbootstrap.com"
