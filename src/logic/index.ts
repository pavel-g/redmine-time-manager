import {printHelpMsg} from './help';
import {args} from './args';
import {save} from "./save";

async function main() {
  try {
    if (args['help']) {
      printHelpMsg();
    }

    const cmd = args['cmd'];
    if (cmd === 'save') {
      await save();
    } else {
      printHelpMsg();
    }
  } catch (e) {
    console.error('Ошибка при выполнении:', e);
    process.exit(1);
  }
  process.exit(0);
}

main();