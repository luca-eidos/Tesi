import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import { validateImage, tmpFolder } from "./requests/utils.mjs";
import { toGrayScale, toSepia, resize, rotate90, convert, brightness, imageBlur, sharpen, contrast } from "./requests/endpoints.mjs";

const app = express();

// Middlewares
app.use(cors());
app.use(multer({ dest: tmpFolder }).single("image"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

const port = 5000;

// Serve React client
app.use(express.static("client/build"));

// Endpoints
app.post("/gray-scale", validateImage, toGrayScale);
app.post("/sepia", validateImage, toSepia);
app.post("/resize", validateImage, resize);
app.post("/rotate", validateImage, rotate90);
app.post("/convert", validateImage, convert);
app.post("/brightness", validateImage, brightness);
app.post("/blur", validateImage, imageBlur);
app.post("/sharpen", validateImage, sharpen);
app.post("/contrast", validateImage, contrast);

app.listen(port);
