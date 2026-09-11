const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDirectory = path.join(__dirname, "..", "public");
const sourceFiles = [
  "comfort_cushions.jpg",
  "engineering-lifestyle.png",
  "smart_ai_chip.jpg",
];
const removeOriginals = process.argv.includes("--remove-originals");

async function main() {
  for (const sourceFile of sourceFiles) {
    const input = path.join(publicDirectory, sourceFile);
    const output = path.join(publicDirectory, sourceFile.replace(/\.(jpg|png)$/, ".webp"));

    if (!removeOriginals) {
      await sharp(input)
        .resize({ width: 1440, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4, smartSubsample: true })
        .toFile(output);
    } else if (!fs.existsSync(output)) {
      throw new Error(`Refusing to remove ${input}: optimized counterpart is missing.`);
    }

    if (removeOriginals) fs.unlinkSync(input);
    console.log(`${sourceFile}: ${removeOriginals ? "original removed" : "converted"}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
