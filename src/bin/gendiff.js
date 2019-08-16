#!/usr/bin/env node

// import fs from 'fs';
import program from 'commander';
import path from 'path';
import _ from 'lodash';
import parseFile from '../parsers';

const compareFlatFiles = (first, second) => {
  const arrToResult = (arr) => {
    if (arr.length === 0) {
      return '';
    }
    return `${arr.shift()}\n${arrToResult(arr)}`;
  };

  const compare = Object.keys(second).reduce((acc, key) => { // перебор ключей второго файла
    if (_.has(first, key)) { // ключи совпадают, смотрим изменения
      if (Object.values(first).includes(second[key])) { // изменений не было
        acc.push(`    ${key}: ${second[key]}`); // добавляем строку без +/-
      } else { // изменения были, добавляем сначала с минусом, потом с плюсом
        acc.push(`  + ${key}: ${second[key]}`);
        acc.push(`  - ${key}: ${first[key]}`);
      }
    } else { // ключа нет, просто добавляем его в результат
      acc.push(`  + ${key}: ${second[key]}`);
    }

    return acc;
  }, []);
  // и проверка на удаление ключа из первого файла
  // eslint-disable-next-line array-callback-return
  Object.keys(first).map((key) => {
    if (!Object.keys(second).includes(key)) {
      compare.push(`  - ${key}: ${first[key]}`);
    }
  });

  const result = `\n{\n${arrToResult(compare.sort())}}`;
  return result;
};

const genDiff = (before, after) => {
  const pathToFirst = path.resolve(__dirname, process.cwd(), before);
  const pathToSecond = path.resolve(__dirname, process.cwd(), after);

  const firstParse = parseFile(pathToFirst);
  const secondParse = parseFile(pathToSecond);

  return compareFlatFiles(firstParse, secondParse);
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
