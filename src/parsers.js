import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import ini from 'ini';


const mapping = {
  '.json': item => JSON.parse(item),
  '.yaml': item => yaml.safeLoad(item),
  '.ini': item => ini.parse(item),
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
