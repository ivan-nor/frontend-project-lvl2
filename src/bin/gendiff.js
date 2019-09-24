#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('0.0.1')
  .option('-f, --format [param]', 'change [param] difference', 'recursive')
  .action((first, second) => {
    if (first && second) {
      console.log(gendiff(first, second, program.format));
    }
  });

program.parse(process.argv);

if (!program.args.length) program.help();
