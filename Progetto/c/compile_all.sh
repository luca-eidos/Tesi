#! /bin/bash

ls *.c | grep -v Image | while read input; do
    output=`basename $input .c`
    clang $input Image.c -o "../bin/${output}.wasm" -std=c17 -Wall -lm -O3
done;