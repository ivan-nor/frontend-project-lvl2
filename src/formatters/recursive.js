import _ from 'lodash';

const tab = '  ';

const stringify = (obj, depthOfTabs) => {
  if (_.isObject(obj)) {
    const list = _.keys(obj);
    const result = list
      .map(key => `${tab.repeat(depthOfTabs + 2)}${key}: ${obj[key]}`);
    return `{\n${result.join('\n')}\n${tab.repeat(depthOfTabs)}}`;
  }
  return `${obj}`;
};

const astToRecursive = (ast) => {
  const iter = (tree, depthIndent = 1) => {
    const nodes = tree.map(({
      name, type, nextValue, prevValue,
    }) => {
      const indent = tab.repeat(depthIndent);
      switch (type) {
        case 'nested': {
          return `${indent}  ${name}: {\n${iter(nextValue, depthIndent + 2)}\n${'  '.repeat(depthIndent + 1)}}`;
        }
        case 'added': {
          return `${indent}+ ${name}: ${stringify(nextValue, depthIndent + 1)}`;
        }
        case 'deleted': {
          return `${indent}- ${name}: ${stringify(nextValue, depthIndent + 1)}`;
        }
        case 'changed': {
          return `${indent}+ ${name}: ${stringify(nextValue, depthIndent + 1)}\n${indent}- ${name}: ${stringify(prevValue, depthIndent + 1)}`;
        }
        case 'unchanged': {
          return `${indent}  ${name}: ${stringify(nextValue, depthIndent + 2)}`;
        }
        default:
          throw new Error('unexpected type of node');
      }
    });
    return `${nodes.join('\n')}`;
  };
  return `{\n${iter(ast, 1)}\n}`;
};

export default astToRecursive;
