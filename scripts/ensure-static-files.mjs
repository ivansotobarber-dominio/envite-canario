import { copyFile, mkdir, stat, readdir, readFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";

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

// Next 16.2 exports nested RSC segments with Windows separators. The client
// requests dot-separated names on every platform. Preserve originals as well.
async function normalizeSegments(directory, segmentRoot, parts = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (segmentRoot) {
        await normalizeSegments(source, segmentRoot, [...parts, entry.name]);
      } else if (entry.name.startsWith("__next.")) {
        await normalizeSegments(source, directory, [entry.name]);
      } else {
        await normalizeSegments(source);
      }
    } else if (segmentRoot && entry.isFile() && entry.name.endsWith(".txt")) {
      const destination = join(segmentRoot, [...parts, entry.name].join("."));
      const content = await readFile(source);
      let existing;
      try { existing = await readFile(destination); }
      catch (error) { if (error.code !== "ENOENT") throw error; }
      if (existing && !existing.equals(content)) {
        throw new Error(`Conflicting RSC export: ${destination}`);
      }
      if (!existing) await copyFile(source, destination);
    }
  }
}

await normalizeSegments(resolve("out"));
