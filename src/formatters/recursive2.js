import _ from 'lodash';

const tab = '  ';

const stringify = (obj, depthOfTabs) => {
  if (_.isObject(obj)) {
    const list = _.keys(obj);
    const result = list
      .map(key => `\n${tab.repeat(depthOfTabs + 2)}${key}: ${obj[key]}`);
    return `{${result.join('')}\n${tab.repeat(depthOfTabs)}}`;
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
          return `${indent}  ${name}: ${iter(nextValue, depthIndent + 2)}${'  '.repeat(depthIndent + 1)}}\n`;
        }
        case 'added': {
          return `${indent}+ ${name}: ${stringify(nextValue, depthIndent + 1)}\n`;
        }
        case 'deleted': {
          return `${indent}- ${name}: ${stringify(nextValue, depthIndent + 1)}\n`;
        }
        case 'changed': {
          return `${indent}+ ${name}: ${stringify(nextValue, depthIndent + 1)}\n${indent}- ${name}: ${stringify(prevValue, depthIndent + 1)}\n`;
        }
        case 'unchanged': {
          return `${indent}  ${name}: ${stringify(nextValue, depthIndent + 2)}\n`;
        }
        default:
          return '';
      }
    });
    return `{\n${nodes.join('')}`;
  };
  const resultStr = iter(ast, 1);
  return `\n${resultStr}}`;
};

export default astToRecursive;
