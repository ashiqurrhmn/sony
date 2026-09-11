const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const frameDirectories = [
  "hero-section-headphone-frames",
  "moving-headphone-frames",
  "headphone-model-frames",
];
const root = path.join(__dirname, "..", "public");
const concurrency = 6;
const removeOriginals = process.argv.includes("--remove-originals");

async function optimiseDirectory(directory) {
  const absoluteDirectory = path.join(root, directory);
  const frames = fs
    .readdirSync(absoluteDirectory)
    .filter((file) => file.endsWith(".png"))
    .sort();

  let cursor = 0;
  const worker = async () => {
    while (cursor < frames.length) {
      const frame = frames[cursor++];
      const input = path.join(absoluteDirectory, frame);
      const output = path.join(absoluteDirectory, frame.replace(/\.png$/, ".webp"));
      await sharp(input)
        .resize({ width: 1440, height: 810, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 75, effort: 4, smartSubsample: true })
        .toFile(output);
    }
  };

  if (removeOriginals) {
    for (const frame of frames) {
      const input = path.join(absoluteDirectory, frame);
      const output = path.join(absoluteDirectory, frame.replace(/\.png$/, ".webp"));
      if (!fs.existsSync(output)) {
        throw new Error(`Refusing to remove ${input}: optimized counterpart is missing.`);
      }
      fs.unlinkSync(input);
    }
  } else {
    await Promise.all(Array.from({ length: concurrency }, worker));
  }

  console.log(`${directory}: ${frames.length} frames converted`);
}

async function main() {
  for (const directory of frameDirectories) {
    await optimiseDirectory(directory);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
