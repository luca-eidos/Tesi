import { WASI } from 'wasi';
import { argv, env } from 'node:process';
import { readFile } from 'node:fs/promises';
import tmp from "tmp";
import fs from "fs";
import { runWasi, handleRun } from "./utils.mjs"

export const toBlackAndWhite = async (req, res) => {
  await handleRun(req, res, "black_and_white");
}
