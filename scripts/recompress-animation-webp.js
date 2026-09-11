const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const frameDirectories = [
  "hero-section-headphone-frames",
  "moving-headphone-frames",
  "headphone-model-frames",
];
const publicDirectory = path.join(__dirname, "..", "public");
const concurrency = 6;
let skippedFrames = 0;

function replaceFile(source, temporary) {
  // Windows can briefly lock a static asset while a local dev server or file
  // indexer reads it. Retrying keeps the optimizer safe and resumable.
  fs.rmSync(source, { force: true, maxRetries: 12, retryDelay: 150 });
  fs.renameSync(temporary, source);
}

async function recompressDirectory(directory) {
  const absoluteDirectory = path.join(publicDirectory, directory);
  const frames = fs
    .readdirSync(absoluteDirectory)
    .filter((file) => file.endsWith(".webp") && !file.includes(".optimizing."));
  let cursor = 0;

  const worker = async () => {
    while (cursor < frames.length) {
      const frame = frames[cursor++];
      const source = path.join(absoluteDirectory, frame);
      const temporary = path.join(absoluteDirectory, `${frame}.optimizing.webp`);
      const originalSize = fs.statSync(source).size;

      if (fs.existsSync(temporary)) fs.unlinkSync(temporary);

      await sharp(source)
        .resize({ width: 1280, height: 720, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 68, effort: 4, smartSubsample: true })
        .toFile(temporary);

      if (fs.statSync(temporary).size < originalSize) {
        try {
          replaceFile(source, temporary);
        } catch (error) {
          skippedFrames += 1;
          if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
          console.warn(`Skipped locked frame: ${path.join(directory, frame)} (${error.code})`);
        }
      } else {
        fs.unlinkSync(temporary);
      }
    }
  };

  await Promise.all(Array.from({ length: concurrency }, worker));
  console.log(`${directory}: ${frames.length} frames recompressed`);
}

async function main() {
  for (const directory of frameDirectories) {
    await recompressDirectory(directory);
  }
  if (skippedFrames > 0) {
    console.warn(`${skippedFrames} locked frame(s) kept at their existing size; rerun after closing the preview to compress them.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
