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
  const iter = (tree, depth) => {
    const nodes = tree.reduce((acc, {
      name, type, nextValue, prevValue,
    }) => {
      const indent = tab.repeat(depth);
      switch (type) {
        case 'nested': {
          return [...acc, `${indent}  ${name}: ${iter(nextValue, depth + 2)}${'  '.repeat(depth + 1)}}\n`];
        }
        case 'added': {
          return [...acc, `${indent}+ ${name}: ${stringify(nextValue, depth + 1)}\n`];
        }
        case 'deleted': {
          return [...acc, `${indent}- ${name}: ${stringify(nextValue, depth + 1)}\n`];
        }
        case 'changed': {
          return [...acc, `${indent}+ ${name}: ${stringify(nextValue, depth + 1)}\n${indent}- ${name}: ${stringify(prevValue, depth + 1)}\n`];
        }
        case 'unchanged': {
          return [...acc, `${indent}  ${name}: ${stringify(nextValue, depth + 2)}\n`];
        }
        default:
          return acc;
      }
    }, [], 1);
    return `{\n${nodes.join('')}`;
  };
  const resultStr = iter(ast, 1);
  return `\n${resultStr}}`;
};

export default astToRecursive;
