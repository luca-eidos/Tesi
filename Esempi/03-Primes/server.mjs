import { readFile } from 'node:fs/promises';
import { WASI } from 'wasi';
import { argv, env } from 'node:process';
import { getPrimesCount } from './js/primes.mjs';

import { exec } from "child_process";
import  express from 'express';
import fs from "fs";

import bodyParser from "body-parser";

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
const port = 5000;

app.use(express.static('public'))

app.get("/c", (req, res, next) => {
  let start = process.hrtime();
  exec("./c/primes", (err, stdout, stderr) => {
    let [secs, nanos] = process.hrtime(start);
    res.send(`execution time: ${secs}:${nanos/1000000}`);
  })
});

app.get("/js", (req, res, next) => {
  let start = process.hrtime();
  let count = getPrimesCount();
  let [secs, nanos] = process.hrtime(start);
  res.send(`execution time: ${secs}:${nanos/1000000}`);
})

const wasi = new WASI({
  args: ["node --experimental-wasi-unstable-preview1 --trace-warnings server.mjs", "/sandbox/demo.c", "/sandbox/demo.copy"],
  env,
  preopens: {
    '/sandbox': "."
  }
});

// Some WASI binaries require:
//   const importObject = { wasi_unstable: wasi.wasiImport };
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await readFile(new URL('./c/primes.wasm', import.meta.url))
);
const instance = await WebAssembly.instantiate(wasm, importObject);
app.get("/wasm", (req, res, next) => {
  let start = process.hrtime();
  wasi.start(instance);
  let [secs, nanos] = process.hrtime(start);
  res.send(`execution time: ${secs}:${nanos/1000000}`);
})

app.use(express.static("static"))

app.listen(port);