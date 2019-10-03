import path from 'path';
import fs from 'fs';
import parse from './parsers';
import buildInternalTree from './builder';
import getFormatter from './formatters';

const getData = (relativePath) => {
  const absolutePath = path.resolve(__dirname, process.cwd(), relativePath);
  const data = fs.readFileSync(absolutePath, 'utf8');
  return data;
};

const genDiff = (pathToBefore, pathToAfter, format) => {
  const firstData = getData(pathToBefore);
  const secondData = getData(pathToAfter);

  const firstParsingInObj = parse(firstData, path.extname(pathToBefore));
  const secondParsingInObj = parse(secondData, path.extname(pathToAfter));

  const formatter = getFormatter(format);

  const result = formatter(buildInternalTree(firstParsingInObj, secondParsingInObj));

  return result;
};

export default genDiff;
