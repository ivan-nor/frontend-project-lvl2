import path from 'path';
import fs from 'fs';
import parse from './parsers';
import recursiveAst from './formatters/recursive';
import plainAst from './formatters/plain';
import buildInternalTree from './builder';
import jsonAst from './formatters/json';

const getData = (relativePath) => {
  const absolutePath = path.resolve(__dirname, process.cwd(), relativePath);
  const data = fs.readFileSync(absolutePath, 'utf8');
  return data;
};

const genDiff = (before, after, format) => {
  const formatters = {
    plain: plainAst,
    recursive: recursiveAst,
    json: jsonAst,
  };

  const firstData = getData(before);
  const secondData = getData(after);

  const firstParse = parse(firstData, path.extname(before));
  const secondParse = parse(secondData, path.extname(after));

  const result = formatters[format](buildInternalTree(firstParse, secondParse));
  return result;
};

export default genDiff;
