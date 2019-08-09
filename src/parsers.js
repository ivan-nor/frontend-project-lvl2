import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const mapping = {
  '.json': obj => JSON.parse(obj),
  '.yaml': obj => yaml.safeLoad(obj),
};

export default (file) => {
  const extname = path.extname(file);

  const pathToFile = path.resolve(__dirname, process.cwd(), file);
  const dataOfFile = fs.readFileSync(pathToFile, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  const parsingFile = mapping[extname](dataOfFile);

  return parsingFile;
};
