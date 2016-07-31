#!/bin/bash

stack exec site clean
stack exec site build
git checkout gh-pages
rsync -a --filter='P _site/' --filter='P _cache/' --filter='P .git/' --filter='P .gitignore' --delete-excluded _site/ .
git add -A
git commit -m 'Publish'
git push origin gh-pages
git checkout master
