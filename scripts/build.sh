#!/usr/bin/env bash
set -e

CURRENT_BRANCH="$(git symbolic-ref --short -q HEAD)"

success() {
  echo -e "\033[32;1m$1"
}

error() {
  echo -e "\033[31;1m$1"
}

if [ -z "$S3PATH" ]; then
  echo "S3PATH not set, defaulting to current branch ${CURRENT_BRANCH}"
  S3PATH=$CURRENT_BRANCH
fi

if [ "$S3PATH" == "latest" ]; then
  echo "building prod site..."
  echo "npm run build"
else
  echo "building site with path prefix - '/${S3PATH}'..."
  echo "S3PATH=${S3PATH} npm run build"
fi

success "deploy success!!!"
