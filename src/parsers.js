import yaml from 'js-yaml';
import ini from 'ini';

export default (obj) => {
  const parsers = {
    '.json': item => JSON.parse(item),
    '.ini': item => ini.parse(item),
    '.yaml': item => yaml.safeLoad(item),
  };

  const { data, extention } = obj;

  const parse = parsers[extention](data);

  return parse;
};
