import { WASI } from 'wasi';
import { argv, env } from 'node:process';
import { readFile } from 'node:fs/promises';
import tmp from "tmp";
import fs from "fs";
import { runWasi, runAndCleanup } from "./utils.mjs"

export const toBlackAndWhite = async (req, res) => {
  await runAndCleanup(req, res, "black_and_white");
}
