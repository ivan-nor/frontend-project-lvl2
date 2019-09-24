const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const plainAst = (ast) => {
  // console.log('START AST', ast);
  const iter = (acc, depthName, list) => {
    console.log('START NEW ITER ', list, '\nDEPTH NAME ', depthName);
    console.log('\nACC ', acc);
    if (list.length === 0) {
      console.log('END');
      return acc;
    }
    const [first, ...rest] = list;
    const { name, type, value } = first;
    const newDepthName = !depthName ? `${name}` : `${depthName}.${name}`;
    // console.log('FIRST ', first);
    // console.log('REST ', rest);
    console.log('NAME ', name);
    console.log('TYPE ', type);
    console.log('VALUE ', value);
    console.log('NEW DEPTHNAME ', newDepthName);
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
    console.log('RESULT ', result);

    return `${iter(`${acc}${result}`, depthName, rest)}`;
  };
  return `${iter('', '', ast)}}`;
};

export default plainAst;
