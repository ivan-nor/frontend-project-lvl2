#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('0.0.1')
  .option('-f, --format [param]', 'change [param] difference', 'recursive')
  .action((before, after) => {
    console.log(gendiff(before, after, program.format));
  });

program.parse(process.argv);

if (!program.args.length) program.help();
