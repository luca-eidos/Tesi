#! /bin/bash

nodemon -x 'node --experimental-wasi-unstable-preview1 index.mjs || touch index.mjs'