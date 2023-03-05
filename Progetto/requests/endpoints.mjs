import { handleRun } from "./utils.mjs";

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
