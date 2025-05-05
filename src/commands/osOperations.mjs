import { EOL, cpus, homedir, userInfo } from 'os';

async function handleOsOperation(args) {
  try {
    if (!args[0]) throw new Error('Invalid input');

    switch (args[0]) {
      case '--EOL':
        console.log(JSON.stringify(EOL));
        break;
      case '--cpus':
        console.log(
          cpus().map((cpu) => ({
            model: cpu.model,
            speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
          }))
        );
        break;
      case '--homedir':
        console.log(homedir());
        break;
      case '--username':
        console.log(userInfo().username);
        break;
      case '--architecture':
        console.log(process.arch);
        break;
      default:
        throw new Error('Invalid input');
    }
  } catch {
    console.log('Invalid input');
  }
}

export { handleOsOperation };
