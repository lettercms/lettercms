#!/bin/bash

echo "Pull Request ID: $VERCEL_GIT_PULL_REQUEST_ID"

if [[ -z "${VERCEL_GIT_PULL_REQUEST_ID}" ]]; then
  echo "Build skipped"
  exit 0;
else
  echo "Build can proceed"
  exit 1;
fi
