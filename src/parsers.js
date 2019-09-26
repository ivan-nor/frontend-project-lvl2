import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import ini from 'ini';

export default (relativePath) => {
  const parsers = {
    '.json': item => JSON.parse(item),
    '.ini': item => ini.parse(item),
    '.yaml': item => yaml.safeLoad(item),
  };

  const format = path.extname(relativePath);

  const absolutePath = path.resolve(__dirname, process.cwd(), relativePath);

  const data = fs.readFileSync(absolutePath, 'utf8');

  const parsing = parsers[format](data);

  return parsing;
};
