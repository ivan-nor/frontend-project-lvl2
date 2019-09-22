import recursiveAst from './formatters/recursive';
import plainAst from './formatters/plain';
import render from './renderer';

const mapping = {
  'plain': item => plainAst(item),
  'recursive': item => recursiveAst(item),
};

export default (first, second, format = 'plain') => mapping[format](render(first, second));
