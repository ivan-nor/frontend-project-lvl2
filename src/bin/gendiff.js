#!/usr/bin/env node
// import path from 'path';
import fs from 'fs';
import program from 'commander';
import _ from 'lodash';

const arrToResult = (arr) => {
  if (arr.length === 0) {
    return '';
  }
  return `${arr.shift()}\n${arrToResult(arr)}`;
};

const compareFiles = (first, second) => {
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
  Object.keys(first).map((key) => {
    if (!Object.keys(second).includes(key)) {
      compare.push(`  - ${key}: ${first[key]}`);
    }
  });

  const result = `\n{\n${arrToResult(compare.sort())}}`;

  return result;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const first = fs.readFileSync(pathToFile1, 'utf8', (err, data) => {
    // читаем первый файл, его содержимое в data
    if (err) throw err;
    console.log(data);
  });

  const second = fs.readFileSync(pathToFile2, 'utf8', (err, data) => {
    // читаем второй файл, его содержимое в data
    if (err) throw err;
    console.log(data);
  });
  const firstJSON = JSON.parse(first);
  const secondJSON = JSON.parse(second);

  return compareFiles(firstJSON, secondJSON);
};

let before;
let after;

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
