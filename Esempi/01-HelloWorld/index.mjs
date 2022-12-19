import { readFile } from 'node:fs/promises';
import { WASI } from 'wasi';
import { argv, env } from 'node:process';

// console.time('WASI execution');

const wasi = new WASI({
  args: ["node --experimental-wasi-unstable-preview1 --trace-warnings index.mjs", "/sandbox/demo.c", "/sandbox/demo.copy"],
  env,
  preopens: {
    '/sandbox': '/home/luca/Tesi/Esempi/01-HelloWorld'
  }
});

// Some WASI binaries require:
//   const importObject = { wasi_unstable: wasi.wasiImport };
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await readFile(new URL('./demo.wasm', import.meta.url))
);
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);
// console.timeEnd('WASI execution');
