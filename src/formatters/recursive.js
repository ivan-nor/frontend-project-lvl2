import _ from 'lodash';

const tab = '  ';

const stringify = (obj, depthOfTabs) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const list = _.keys(obj);
    const separator = list.length > 0 ? '\n' : '';
    const result = list.reduce((acc, key) => {
      const str = `${tab.repeat(depthOfTabs + 2)}${key}: ${obj[key]}${separator}`;
      return `${acc}${str}`;
    }, '');
    return `{\n${result}${tab.repeat(depthOfTabs)}}`;
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
    const indent = `${tab.repeat(depth)}`;
    let str;
    if (type === 'added') {
      str = `+ ${name}: ${stringify(value, depth + 1)}`;
    }
    if (type === 'deleted') {
      str = `- ${name}: ${stringify(value, depth + 1)}`;
    }
    if (type === 'changed') {
      str = `+ ${name}: ${stringify(value, depth + 1)}\n${indent}- ${name}: ${stringify(prevValue, depth + 1)}`;
    }
    if (type === 'unchanged' && Array.isArray(value)) {
      str = `  ${name}: {\n${iter('', depth + 2, value)}${tab.repeat(depth + 1)}}`;
    } else if (type === 'unchanged' && !Array.isArray(value)) {
      str = `  ${name}: ${stringify(value, depth + 2)}`;
    }
    return `${iter(`${acc}${indent}${str}\n`, depth, rest)}`;
  };
  return `\n{\n${iter('', 1, ast)}}`;
};

export default parseAst;
