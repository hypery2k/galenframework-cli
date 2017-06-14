#!/usr/bin/env bash

git pull --rebase && \
  conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && \
  git add CHANGELOG.md && git commit -m 'chore(changelog): Updated CHANGELOG.md' && \
  git checkout master && git merge develop && git push && \
  git checkout develop
