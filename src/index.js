import path from 'path';
import parseFile from './parsers';
import recursiveAst from './formatters/recursive';
import plainAst from './formatters/plain';
import render from './renderer';
import jsonAst from './formatters/json';

const genDiff = (before, after, format = 'recursive') => {
  const formatters = {
    plain: item => plainAst(item),
    recursive: item => recursiveAst(item),
    json: item => jsonAst(item),
  };

  const pathToFirst = path.resolve(__dirname, process.cwd(), before);
  const pathToSecond = path.resolve(__dirname, process.cwd(), after);

  const firstParse = parseFile(pathToFirst);
  const secondParse = parseFile(pathToSecond);

  return formatters[format](render(firstParse, secondParse));
};

export default genDiff;
