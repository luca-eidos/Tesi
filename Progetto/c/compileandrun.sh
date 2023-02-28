#! /bin/bash

# gcc gray_scale.c Image.c -o gray_scale -std=c17 -Wall -lm
clang gray_scale.c Image.c -o gray_scale.wasm -std=c17 -Wall -lm -O3
# ./gray_scale sky.jpg sky_black_white.jpg
wasmtime ./gray_scale.wasm --dir . sky.jpg sky_gray.jpg
xdg-open sky_gray.jpg
