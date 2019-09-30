import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extention) => {
  const parsers = {
    '.json': JSON.parse,
    '.ini': ini.parse,
    '.yaml': yaml.safeLoad,
  };

  const parse = parsers[extention](data);

  return parse;
};
