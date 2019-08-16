import _ from 'lodash';

const tab = '..';

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const stringify = (obj, depthOfTabs) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const list = _.keys(obj);
    const separator = list.length > 0 ? '\n' : '';
    const result = list.reduce((acc, key) => {
      const str = `${separator}${tab.repeat(depthOfTabs + 2)}${key}: ${obj[key]}${separator}`;
      return `${acc}${str}`;
    }, '');
    return `{${result}${tab.repeat(depthOfTabs)}}`;
  }
  return `${obj}`;
};

const render = (first, second) => {
  const firstKeys = _.keys(first);
  const secondKeys = _.keys(second);
  const allKeys = _.union(firstKeys, secondKeys);
  const getFirstValue = key => _.get(first, key);
  const getSecondValue = key => _.get(second, key);

  const result = allKeys.reduce((acc, key) => {
    const node = {
      name: key,
      type: '',
      value: [],
    };
    if (typeof getFirstValue(key) === 'object' && typeof getSecondValue(key) === 'object') {
      // оба значения объекты
      node.type = 'unchanged';
      node.value = render(getFirstValue(key), getSecondValue(key));
      return [...acc, node];
    }
    if (getFirstValue(key) === getSecondValue(key)) {
      node.type = 'unchanged';
      node.value = getFirstValue(key);
      return [...acc, node];
    }
    if (!_.has(second, key) && _.has(first, key)) {
      node.type = 'deleted';
      node.value = getFirstValue(key);
      return [...acc, node];
    }
    if (!_.has(first, key) && _.has(second, key)) {
      // ключ добавлен
      node.type = 'added';
      node.value = getSecondValue(key);
      return [...acc, node];
    }
    if (getFirstValue(key) !== getSecondValue(key)) {
      // значения не равны
      node.type = 'changed';
      node.value = [getSecondValue(key), getFirstValue(key)];
    }
    return [...acc, node];
  }, []);
  return result;
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

export default (first, second) => parseAst(render(first, second));
