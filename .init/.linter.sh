#!/bin/bash
cd /home/kavia/workspace/code-generation/user-authentication-service-22764-22773/login_api_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

