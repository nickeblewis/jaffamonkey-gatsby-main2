#!/bin/bash

set -e

success() {
  echo -e "\033[32;1m$1"
}

error() {
  echo -e "\033[31;1m$1"
}

if [ -z "$GH_TOKEN" ]; then
  error "Environment variable GH_TOKEN does not exist. Stopping deploy."
  exit 1
fi

if [ -z "$TRAVIS_BRANCH" ]; then
  error "Environment variable TRAVIS_BRANCH does not exist. Stopping deploy."
  exit 1
fi

( cd build
 git init
 git config user.name "eddywashere"
 git config user.email "edward.d.hernandez@gmail.com"
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)

success "Successfully published site for $TRAVIS_COMMIT!"