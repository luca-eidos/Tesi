#! /bin/bash

clang demo.c -o demo.wasm

$ echo hello world > test.txt
$ wasmtime demo.wasm test.txt /tmp/somewhere.txt
error opening input test.txt: Capabilities insufficient

$ wasmtime --dir=. --dir=/tmp demo.wasm test.txt /tmp/somewhere.txt
$ cat /tmp/somewhere.txt
hello world