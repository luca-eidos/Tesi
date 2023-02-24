import { WASI } from 'wasi';
import { argv, env } from 'node:process';
import { readFile } from 'node:fs/promises';
import tmp from "tmp";
import fs from "fs";

const runWasi = async (imagePath, output) => {
  const wasi = new WASI({
    args: [
      argv[0], 
      imagePath,
      output
    ],
    env,
    preopens: {
      '/tmp': "/tmp"
    }
  });
  
  const importObject = { wasi_snapshot_preview1: wasi.wasiImport };
  
  const wasm = await WebAssembly.compile(
    await readFile(new URL('../bin/black_and_white.wasm', import.meta.url))
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
  return output;
}

export const toBlackAndWhite = async (req, res) => {
  const imagePath = req.file.path;

  // Convert the image to black and white
  const output = tmp.fileSync({ 
    mode: 0o644, 
    postfix: (req.file.mimetype === 'image/jpeg')? ".jpg" : ".png" 
  }).name;
  await runWasi(imagePath, output);

  // Read the uploaded file from disk and send it back to the client
  fs.readFile(output, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading file.' });
    }
    res.contentType(req.file.mimetype);
    res.send(data);
    fs.unlink(output, (err) => {
      if (err) {
        console.error(`Error deleting file ${output}:`, err);
      }
    });
  });
}
