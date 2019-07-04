#!/bin/sh
set -ex
npm install
ng serve --host 0.0.0.0 \
  --port 4200 \
  --disable-host-check  \
  --liveReload=true \
  --watch=true
