import { createInterface } from 'readline';
import { handleNavigation } from './commands/navigation.mjs';
import { handleFileOperation } from './commands/fileOperations.mjs';
import { handleOsOperation } from './commands/osOperations.mjs';
import { handleCompression } from './commands/compression.mjs';
import { printCurrentDir } from './utils/pathUtils.mjs';
import { GOODBYE_MESSAGE } from './constants.mjs';
import { homedir } from 'os';

let currentDir = homedir();

function setupCLI(handleCommand, username) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function prompt() {
    printCurrentDir(currentDir);
    rl.question('Enter command: ', (input) => {
      handleCommand(input.trim(), username)
        .then(() => prompt())
        .catch(() => prompt());
    });
  }

  prompt();
}

async function handleCommand(command, username) {
  if (command === '.exit') {
    console.log(GOODBYE_MESSAGE.replace('{username}', username));
    process.exit(0);
  }

  const [cmd, ...args] = command.split(' ').filter(Boolean);

  switch (cmd) {
    case 'up':
    case 'cd':
    case 'ls':
      currentDir = await handleNavigation(cmd, args, currentDir);
      break;
    case 'cat':
    case 'add':
    case 'mkdir':
    case 'rn':
    case 'cp':
    case 'mv':
    case 'rm':
    case 'hash':
      await handleFileOperation(cmd, args, currentDir);
      break;
    case 'os':
      await handleOsOperation(args);
      break;
    case 'compress':
    case 'decompress':
      await handleCompression(cmd, args, currentDir);
      break;
    default:
      console.log('Invalid input');
  }

  return currentDir;
}

function getCurrentDir() {
  return currentDir;
}

export { setupCLI, handleCommand, getCurrentDir };
