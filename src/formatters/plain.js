const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const plainAst = (ast) => {
  const iter = (acc, depthName, list) => {
    if (list.length === 0) {
      return acc;
    }
    const [first, ...rest] = list;
    const { name, type, value } = first;
    const newDepthName = !depthName ? `${name}` : `${depthName}.${name}`;
    let str;
    // если проверка на массив в VALUE дает массив c объектом, то рекурсия
    if (Array.isArray(value) && isObject(value[0]) && isObject(value[1])) {
      str = `${iter('', newDepthName, value)}`;
    }
    if (type === 'added') {
      str = `\nProperty '${newDepthName}' was added with value: ${isObject(value) ? '[complex value]' : value}`;
    }
    if (type === 'deleted') {
      str = `\nProperty '${newDepthName}' was removed`;
    }
    if (type === 'changed') {
      str = `\nProperty '${newDepthName}' was updated. From ${isObject(value[1]) ? '[complex value]' : value[1]} to ${isObject(value[0]) ? '[complex value]' : value[0]}`;
    }
    if (type === 'unchanged' && !Array.isArray(value)) {
      str = '';
    }
    const result = `${str}`;

    return `${iter(`${acc}${result}`, depthName, rest)}`;
  };
  return `${iter('', '', ast)}`;
};

export default plainAst;
