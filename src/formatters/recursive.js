import _ from 'lodash';

const tab = '  ';

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const stringify = (obj, depthOfTabs) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const list = _.keys(obj);
    const separator = list.length > 0 ? '\n' : '';
    const result = list.reduce((acc, key) => {
      const str = `${tab.repeat(depthOfTabs + 1)}${key}: ${obj[key]}${separator}`;
      return `${acc}${str}`;
    }, '');
    return `{\n${result}${tab.repeat(depthOfTabs)}}`;
  }
  return `${obj}`;
};

const parseAst = (ast) => {
  const iter = (acc, depth, list) => {
    if (list.length === 0) {
      return acc;
    }
    const [first, ...rest] = list;
    const { name, type, value } = first;
    let str;
    const indent = `${tab.repeat(depth)}`;
    // если проверка на массив в VALUE дает массив c объектом, то рекурсия
    if (Array.isArray(value) && isObject(value[0]) && isObject(value[1])) {
      str = `${tab}${name}: {\n${iter('', depth + 1, value)}${indent}${tab}}`;
    }
    if (type === 'added') {
      str = `+ ${name}: ${stringify(value, depth + 1)}`;
    }
    if (type === 'deleted') {
      str = `- ${name}: ${stringify(value, depth + 1)}`;
    }
    if (type === 'changed') {
      str = `+ ${name}: ${stringify(value[0], depth + 1)}\n${indent}- ${name}: ${stringify(value[1], depth + 1)}`;
    }
    if (type === 'unchanged' && !Array.isArray(value)) {
      str = `${tab}${name}: ${stringify(value, depth + 1)}`;
    }
    const result = `${str}\n`;

    return `${iter(`${acc}${indent}${result}`, depth, rest)}`;
  };
  return `\n{\n${iter('', 1, ast)}}`;
};

export default parseAst;
