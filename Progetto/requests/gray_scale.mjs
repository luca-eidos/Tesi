import { handleRun } from "./utils.mjs";

export const toGrayScale = async (req, res) => {
  await handleRun(req, res, "gray_scale");
};
