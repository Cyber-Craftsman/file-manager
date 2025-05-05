import { promises as fs } from 'fs';
import { dirname, normalize, isAbsolute, join } from 'path';
import { validatePath } from '../utils/pathUtils.mjs';

async function handleNavigation(command, args, currentDir) {
  switch (command) {
    case 'up':
      const parentDir = dirname(currentDir);
      return parentDir !== currentDir ? parentDir : currentDir;

    case 'cd':
      if (!args[0]) {
        console.log('Invalid input');
        return currentDir;
      }
      const newDir = validatePath(args[0], currentDir);
      try {
        const stats = await fs.stat(newDir);
        if (stats.isDirectory()) {
          return newDir;
        }
        console.log('Invalid input');
      } catch {
        console.log('Operation failed');
      }
      return currentDir;

    case 'ls':
      try {
        const items = await fs.readdir(currentDir, { withFileTypes: true });
        const folders = items
          .filter((item) => item.isDirectory())
          .map((item) => ({ name: item.name, type: 'directory' }));
        const files = items
          .filter((item) => item.isFile())
          .map((item) => ({ name: item.name, type: 'file' }));
        const sorted = [...folders, ...files].sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        console.table(sorted);
      } catch {
        console.log('Operation failed');
      }
      return currentDir;

    default:
      return currentDir;
  }
}

export { handleNavigation };
