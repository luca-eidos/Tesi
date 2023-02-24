import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import { validateImage, tmpFolder } from "./utils.mjs"
import { toBlackAndWhite } from "./requests/black_and_white.mjs";

const app = express();

app.use(cors());
app.use(multer({ dest: tmpFolder }).single('image'))
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

const port = 5000;

// Serve React client
app.use(express.static("client/build"));

// Endpoints
app.post('/black-and-white', validateImage, toBlackAndWhite);

app.listen(port);
