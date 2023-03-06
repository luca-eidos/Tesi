#! /bin/bash

clang $1.c -o "../bin/$1.wasm" -std=c17 -Wall -lm -O3
