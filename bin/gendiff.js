#!/usr/bin/env node

import { program } from 'commander';
import getDiff from '../src/getDiff.js';

program
.name('gendiff')
.version('1.0.0', '-v, --vers', 'output the current version')
.helpOption('-h, --help', 'output usage information')
.option('-f, --format <type>', 'output format')
.argument('<filePath1>', 'first path to file')
.argument('<filePath2>', 'second path to file')
.description('Compares two configuration files and shows a difference.')
.action(( filePath1, filePath2) => {
  console.log(getDiff(filePath1, filePath2));
});

program.parse(process.argv);
