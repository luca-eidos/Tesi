import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { uploadImage } from "./utils.mjs"
import { toBlackAndWhite } from "./requests/black_and_white.mjs";


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

const port = 5000;

// Serve client
app.use(express.static("client/build"));


// Endpoints
app.post('/black-and-white', uploadImage, toBlackAndWhite);

app.listen(port);
