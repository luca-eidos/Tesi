import tmp from "tmp";
import fs from "fs";
import { handleRun, runWasi } from "./utils.mjs";

export const toGrayScale = async (req, res) => {
  await handleRun(req, res, "gray_scale");
};

export const toSepia = async (req, res) => {
  await handleRun(req, res, "sepia");
};

export const resize = async (req, res) => {
  const args = JSON.parse(req.body.args) || {};
  // console.log(args);
  if(args.perc > 0 && args.perc <= 100){
    await handleRun(req, res, "resize", String(args.perc));
  } else {
    res.status(400).json({ error: "Invalid argument" });
  }
};

export const rotate90 = async (req, res) => {
  await handleRun(req, res, "rotate");
}

export const convert = async (req, res) => {
  const imagePath = req.file.path;

  const output = tmp.fileSync({
    mode: 0o644,
    postfix: req.file.mimetype === "image/jpeg" ? ".png" : ".jpg",
  }).name;
  await runWasi("convert", imagePath, output);

  // Read the uploaded file from disk and send it back to the client
  fs.readFile(output, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file." });
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

export const brightness = async (req, res) => {
  const args = JSON.parse(req.body.args) || {};
  // console.log(args);
  if(args.perc >= 50 && args.perc <= 150){
    await handleRun(req, res, "brightness", String(args.perc));
  } else {
    res.status(400).json({ error: "Invalid argument" });
  }
};
