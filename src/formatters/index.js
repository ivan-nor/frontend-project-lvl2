import astToRecursive from './recursive2';
import astToPlain from './plain2';
import astToJson from './json';

export default (format) => {
  const formatters = {
    plain: astToPlain,
    recursive: astToRecursive,
    json: astToJson,
  };

  return formatters[format];
};
