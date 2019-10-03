import _ from 'lodash';

const plainAst = (ast) => {
  const iter = (acc, depthName, list) => {
    if (list.length === 0) return acc;
    const [first, ...rest] = list;
    const {
      name, type, value, prevValue,
    } = first;
    const newDepthName = !depthName ? `${name}` : `${depthName}.${name}`;
    let str;
    if (type === 'unchanged') {
      str = '';
    }
    if (type === 'nested') {
      str = `${iter('', newDepthName, value)}`;
    }
    if (type === 'added') {
      str = `\nProperty '${newDepthName}' was added with value: ${_.isObject(value) ? '[complex value]' : value}`;
    }
    if (type === 'deleted') {
      str = `\nProperty '${newDepthName}' was removed`;
    }
    if (type === 'changed') {
      str = `\nProperty '${newDepthName}' was updated. From ${_.isObject(prevValue) ? '[complex value]' : prevValue} to ${_.isObject(value) ? '[complex value]' : value}`;
    }
    return `${iter(`${acc}${str}`, depthName, rest)}`;
  };
  return iter('', '', ast);
};

export default plainAst;
