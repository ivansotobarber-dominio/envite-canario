import { copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const files = [
  ["public/llms.txt", "out/llms.txt"],
];

for (const [source, destination] of files) {
  const sourcePath = resolve(source);
  const destinationPath = resolve(destination);
  await stat(sourcePath);
  await mkdir(dirname(destinationPath), { recursive: true });
  await copyFile(sourcePath, destinationPath);
  await stat(destinationPath);
}
