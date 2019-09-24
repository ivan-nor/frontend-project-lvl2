#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('0.0.1')
  .option('-f, --format [format]', 'change [format] difference')
  .arguments('<first> <second>')
  .action((first, second) => {
    if (first && second) {
      console.log(gendiff(first, second, program.format));
    }
  });
console.log('first', program.first);
console.log('second', program.second);
console.log('%s format', program.format);

program.parse(process.argv);

// if (!program.args.length) program.help();
if (!program.format) {
  console.log('no choise');
}
