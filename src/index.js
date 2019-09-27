import path from 'path';
import fs from 'fs';
import parse from './parsers';
import recursiveAst from './formatters/recursive';
import plainAst from './formatters/plain';
import buildInternalTree from './builder';
import jsonAst from './formatters/json';

const buildDataObj = (relativePath) => {
  const absolutePath = path.resolve(__dirname, process.cwd(), relativePath);
  const extention = path.extname(relativePath);
  const data = fs.readFileSync(absolutePath, 'utf8');
  return { data, extention };
};

const genDiff = (before, after, formatter = 'recursive') => {
  const formatters = {
    plain: item => plainAst(item),
    recursive: item => recursiveAst(item),
    json: item => jsonAst(item),
  };

  const firstBuilded = buildDataObj(before);
  const secondBuilded = buildDataObj(after);

  const firstParse = parse(firstBuilded);
  const secondParse = parse(secondBuilded);

  return formatters[formatter](buildInternalTree(firstParse, secondParse));
};

export default genDiff;
