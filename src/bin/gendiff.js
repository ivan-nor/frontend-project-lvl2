#!/usr/bin/env node

const gendiff = require('commander');

// let cmdValue;
// let envValue;

gendiff
  .version('0.1.0')
  .option('-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .on('-h, --help', () => {})
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  // .action((cmd, env) => {
  //   cmdValue = cmd;
  //   envValue = env;
  // })
  .parse(process.argv);

// if (typeof cmdValue === 'undefined') {
//   console.error('no command given!');
//   process.exit(1);
// }
// console.log('command:', cmdValue);
// console.log('environment:', envValue || 'no environment given');
