import recursiveAst from './recursive';
import plainAst from './plain';
import jsonAst from './json';

export default (format) => {
  const formatters = {
    plain: plainAst,
    recursive: recursiveAst,
    json: jsonAst,
  };

  return formatters[format];
};
