const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

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
      str = !Array.isArray(value) ? '' : `${iter('', newDepthName, value)}`;
    }
    if (type === 'added') {
      str = `\nProperty '${newDepthName}' was added with value: ${isObject(value) ? '[complex value]' : value}`;
    }
    if (type === 'deleted') {
      str = `\nProperty '${newDepthName}' was removed`;
    }
    if (type === 'changed') {
      str = `\nProperty '${newDepthName}' was updated. From ${isObject(prevValue) ? '[complex value]' : prevValue} to ${isObject(value) ? '[complex value]' : value}`;
    }
    return `${iter(`${acc}${str}`, depthName, rest)}`;
  };
  return `${iter('', '', ast)}`;
};

export default plainAst;
