import { promises as fs, createReadStream, createWriteStream } from 'fs';
import { join, basename } from 'path';
import { createHash } from 'crypto';
import { pipelineAsync } from '../utils/streamUtils.mjs';
import { validatePath } from '../utils/pathUtils.mjs';

async function handleFileOperation(command, args, currentDir) {
  const filePath = args[0] ? validatePath(args[0], currentDir) : null;
  let destPath = args[1] ? validatePath(args[1], currentDir) : null;

  try {
    switch (command) {
      case 'cat':
        if (!filePath) throw new Error('Invalid input');
        const readStream = createReadStream(filePath);
        readStream.pipe(process.stdout);
        await new Promise((resolve) => readStream.on('end', resolve));
        break;

      case 'add':
        if (!args[0]) throw new Error('Invalid input');
        await fs.writeFile(join(currentDir, args[0]), '');
        break;

      case 'mkdir':
        if (!args[0]) throw new Error('Invalid input');
        await fs.mkdir(join(currentDir, args[0]));
        break;

      case 'rn':
        if (!filePath || !args[1]) throw new Error('Invalid input');
        await fs.rename(filePath, join(currentDir, args[1]));
        break;

      case 'cp':
      case 'mv':
        if (!filePath || !destPath) throw new Error('Invalid input');
        // Check if destPath is a directory
        try {
          const destStat = await fs.stat(destPath);
          if (destStat.isDirectory()) {
            destPath = join(destPath, basename(filePath));
          }
        } catch {
          // If destPath doesn't exist, assume it's a file path
        }
        const readStreamCp = createReadStream(filePath);
        const writeStreamCp = createWriteStream(destPath);
        await pipelineAsync(readStreamCp, writeStreamCp);
        if (command === 'mv') await fs.unlink(filePath);
        break;

      case 'rm':
        if (!filePath) throw new Error('Invalid input');
        await fs.unlink(filePath);
        break;

      case 'hash':
        if (!filePath) throw new Error('Invalid input');
        const hash = createHash('sha256');
        const stream = createReadStream(filePath);
        stream.pipe(hash);
        hash.on('finish', () => console.log(hash.digest('hex')));
        await new Promise((resolve) => stream.on('end', resolve));
        break;

      default:
        throw new Error('Invalid input');
    }
  } catch (error) {
    console.log(error.message === 'Invalid input' ? 'Invalid input' : 'Operation failed');
  }
}

export { handleFileOperation };
