#! /bin/bash

gcc black_and_white.c Image.c -o black_and_white -std=c17 -Wall -lm
clang black_and_white.c Image.c -o black_and_white.wasm -std=c17 -Wall -lm -O3
# ./black_and_white sky.jpg sky_black_white.jpg
wasmtime ./black_and_white.wasm --dir . sky.jpg sky_black_white.jpg
