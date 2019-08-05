#!/usr/bin/env node

const gendiff = require('commander');

// let cmdValue;
// let envValue;

gendiff
  .version('0.1.0')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .on('-h, --help', () => {})
  .arguments('<firstConfig> <secondConfig>')

  // .action((cmd, env) => {
  //   cmdValue = cmd;
  //   envValue = env;
  // })
  .parse(process.argv);

if (!gendiff.args.length) gendiff.help();

// if (typeof cmdValue === 'undefined') {
//   console.error('no command given!');
//   process.exit(1);
// }
// console.log('command:', cmdValue);
// console.log('environment:', envValue || 'no environment given');
