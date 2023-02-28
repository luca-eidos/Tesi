import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import { validateImage, tmpFolder } from "./requests/utils.mjs";
import { toGrayScale } from "./requests/gray_scale.mjs";

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

app.listen(port);
