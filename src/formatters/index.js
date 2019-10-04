import astToRecursive from './recursive';
import astToPlain from './plain';
import astToJson from './json';

export default (format) => {
  const formatters = {
    plain: astToPlain,
    recursive: astToRecursive,
    json: astToJson,
  };

  return formatters[format];
};
