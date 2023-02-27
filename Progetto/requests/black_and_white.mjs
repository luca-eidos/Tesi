import { handleRun } from "./utils.mjs";

export const toBlackAndWhite = async (req, res) => {
  await handleRun(req, res, "black_and_white");
};
