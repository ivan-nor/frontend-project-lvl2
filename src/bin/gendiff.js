#!/usr/bin/env node

// import fs from 'fs';
import program from 'commander';
import path from 'path';
// import _ from 'lodash';
import parseFile from '../parsers';
import compare from '../comparer2';

const genDiff = (before, after) => {
  const pathToFirst = path.resolve(__dirname, process.cwd(), before);
  const pathToSecond = path.resolve(__dirname, process.cwd(), after);

  const firstParse = parseFile(pathToFirst);
  const secondParse = parseFile(pathToSecond);

  return compare(firstParse, secondParse);
};

program
  .version('0.1.0')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((file1, file2) => {
    console.log(genDiff(file1, file2));
  });

program.parse(process.argv);

export default genDiff;
