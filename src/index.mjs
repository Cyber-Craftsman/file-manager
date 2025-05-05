import { setupCLI, handleCommand } from './cli.mjs';
import { WELCOME_MESSAGE, GOODBYE_MESSAGE } from './constants.mjs';

// Get username from CLI arguments or npm config
const args = process.argv.slice(2);
let username =
  args.find((arg) => arg.startsWith('--username='))?.split('=')[1] ||
  process.env.npm_config_username ||
  'User';

console.log(WELCOME_MESSAGE.replace('{username}', username));

// Initialize CLI
setupCLI(async (command) => {
  try {
    await handleCommand(command, username);
  } catch {
    console.log('Operation failed');
  }
}, username);

// Handle process exit
process.on('SIGINT', () => {
  console.log(GOODBYE_MESSAGE.replace('{username}', username));
  process.exit(0);
});
