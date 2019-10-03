import _ from 'lodash';

// const tab = '  ';

const stringify = (obj, depthOfTabs) => {
  if (_.isObject(obj)) {
    const list = _.keys(obj);
    const separator = list.length > 0 ? '\n' : '';
    const result = list.reduce((acc, key) => {
      const str = `${'  '.repeat(depthOfTabs + 2)}${key}: ${obj[key]}${separator}`;
      return `${acc}${str}`;
    }, '');
    return `{\n${result}${'  '.repeat(depthOfTabs)}}`;
  }
  return `${obj}`;
};

const parseAst = (ast) => {
  const iter = (acc, depth, list) => {
    if (list.length === 0) return acc;
    const [first, ...rest] = list;
    const {
      name, type, value, prevValue,
    } = first;
    const indent = `${'  '.repeat(depth)}`;
    const newAcc = [];
    switch (type) {
      case 'added': {
        newAcc.push(`+ ${name}: ${stringify(value, depth + 1)}`);
        break;
      }
      case 'deleted': {
        newAcc.push(`- ${name}: ${stringify(value, depth + 1)}`);
        break;
      }
      case 'changed': {
        newAcc.push(`+ ${name}: ${stringify(value, depth + 1)}\n${indent}- ${name}: ${stringify(prevValue, depth + 1)}`);
        break;
      }
      case 'nested': {
        newAcc.push(`  ${name}: {\n${iter('', depth + 2, value)}${'  '.repeat(depth + 1)}}`);
        break;
      }
      case 'unchanged': {
        newAcc.push(`  ${name}: ${stringify(value, depth + 2)}`);
        break;
      }
      default: {
        return acc;
      }
    }
    return `${iter(`${acc}${indent}${newAcc.join('')}\n`, depth, rest)}`;
  };
  return `\n{\n${iter('', 1, ast)}}`;
};

export default parseAst;
