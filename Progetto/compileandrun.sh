#! /bin/bash

cd client
yarn build
cd ..
nodemon --experimental-wasi-unstable-preview1 index.mjs
