#!/usr/bin/env bash

PACKAGE_VERSION=$(cat cli/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

git pull --rebase && \
  conventional-changelog -p angular -i CHANGELOG.md -s -r 0 -k cli/package.json && \
  git add CHANGELOG.md && git commit -m 'chore(changelog): Updated CHANGELOG.md' && \
  git checkout master && git merge develop && git push && \
  git tag -a v$PACKAGE_VERSION -m "Version $PACKAGE_VERSION" && git push --tags && \
  git checkout develop
