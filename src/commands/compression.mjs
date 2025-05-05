import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipelineAsync } from '../utils/streamUtils.mjs';
import { validatePath } from '../utils/pathUtils.mjs';

async function handleCompression(command, args, currentDir) {
  if (!args[0] || !args[1]) {
    console.log('Invalid input');
    return;
  }

  try {
    const src = validatePath(args[0], currentDir);
    const dest = validatePath(args[1], currentDir);
    const readStream = createReadStream(src);
    const writeStream = createWriteStream(dest);
    const brotli = command === 'compress' ? createBrotliCompress() : createBrotliDecompress();

    await pipelineAsync(readStream, brotli, writeStream);
  } catch {
    console.log('Operation failed');
  }
}

export { handleCompression };
