import path from 'path';
import { WASI } from 'wasi';
import { argv, env } from 'node:process';
import { readFile } from 'node:fs/promises';
import tmp from "tmp";
import fs from "fs";

export const tmpFolder = '/tmp/';

// create a function to handle file uploads
export const validateImage = (req, res, next) => {
  const imageFile = req.file;

  // Check if there's a file in the request body
  if (!imageFile) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Check if the uploaded file is a JPEG or PNG image
  if (imageFile.mimetype !== 'image/jpeg' && imageFile.mimetype !== 'image/png') {
    return res.status(400).json({ error: 'Invalid file type. Please upload a JPEG or PNG image.' });
  }

  next();
};

export const runWasi = async (filename, ...wasmArgs) => {
  const wasi = new WASI({
    args: [
      argv[0], 
      ...wasmArgs
    ],
    env,
    preopens: {
      '/tmp': "/tmp"
    }
  });
  
  const importObject = { wasi_snapshot_preview1: wasi.wasiImport };
  
  const wasm = await WebAssembly.compile(
    await readFile(new URL(`../bin/${filename}.wasm`, import.meta.url))
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
}

export const handleRun = async (req, res, filename, ...otherArgs) => {
  const imagePath = req.file.path;

  // Convert the image to black and white
  const output = tmp.fileSync({ 
    mode: 0o644, 
    postfix: (req.file.mimetype === 'image/jpeg')? ".jpg" : ".png" 
  }).name;
  await runWasi(filename, imagePath, output, ...otherArgs);

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