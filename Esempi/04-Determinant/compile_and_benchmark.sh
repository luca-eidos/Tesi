#! /bin/bash

OUTPUT="tests.txt"

gcc c/lu_determinant.c -o bin/lu_determinant -O3
clang c/lu_determinant.c -o bin/lu_determinant.wasm -O3

for arg in 100 1000 2000 5000 10000 20000; do
    echo $arg:
    echo "  C:"
    time bin/lu_determinant $arg
    echo ""
    echo "  WASM:"
    time wasmtime bin/lu_determinant.wasm $arg
    echo ""
    echo "  Node:"
    time node js/lu_determinant.js $arg
    echo ""
    echo ""
done
