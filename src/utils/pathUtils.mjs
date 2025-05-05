import { normalize, isAbsolute, join } from 'path';

function validatePath(inputPath, currentDir) {
  const absolutePath = isAbsolute(inputPath) ? inputPath : join(currentDir, inputPath);
  return normalize(absolutePath);
}

function printCurrentDir(currentDir) {
  console.log(`You are currently in ${currentDir}`);
}

export { validatePath, printCurrentDir };
