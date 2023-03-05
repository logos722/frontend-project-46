import { program } from 'commander';


program
.name('gendiff')
.description('Compares two configuration files and shows a difference.')
.version('1.0.0')

program.option('-h, --help', 'info about programm')

program.parse(process.argv);

const options = program.opts();
if (options.help) console.log(`Usage: gendiff [options]

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -h, --help           display help for command`)