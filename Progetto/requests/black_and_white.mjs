import { WASI } from 'wasi';
import { argv, env } from 'node:process';
import tmp from "tmp";

const runWasi = async (imagePath) => {
  const output = tmp.fileSync({ mode: 0o644, postfix: imagePath }).name;
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
    await readFile(new URL('./bin/black_and_white.wasm', import.meta.url))
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
  return output;
}


export const toBlackAndWhite = async (req, res) => {
  const { imagePath } = req;

  // Convert the image to black and white
  const output = await runWasi(imagePath);
  const contentType = output.endsWith("png") ? "image/png" : "image/jpeg";

  // Read the uploaded file from disk and send it back to the client
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading file.' });
    }
    res.contentType(contentType);
    res.send(data);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${output}:`, err);
      }
    });
  });
}
