#!/bin/sh


ng build #--prod

git add -f dist/
git commit -m "Updating gh-pages"
#git push
git subtree push --prefix dist/ origin gh-pages
#git reset --soft HEAD^
git rm -r --cached dist
git pull origin gh-pages
