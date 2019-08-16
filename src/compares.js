import _ from 'lodash';

const hasDeletedRender = (first, second) => { // проверка удаленных ключей
  const result = Object.keys(first).reduce((acc, key) => {
    if (_.has(first, key) && !_.has(second, key)) {
      return `${acc}  - ${key}: ${_.get(first, key)}\n`;
    }
    return acc;
  }, '');
  return result;
};

const render = (first, second) => {
  // console.log('FIRST\n', first);
  // console.log('SECOND\n', second);
  const keys = Object.keys(second);
  console.log('KEYS\n', keys);

  const rendering = keys.reduce((strAcc, key) => { // перебор ключей second файла
    // const key = keys[item];
    // console.log(item);
    console.log('FIRST\n', first);
    console.log('SECOND\n', second);
    console.log('KEY\n', key);
    // console.log(typeof key);
    console.log(_.get(first, key));
    console.log(_.get(second, key));
    // если по ключу не обьект :
    if (typeof _.get(second, key) !== 'object') {
      console.log('по ключу не обьект');
      if (_.has(first, key)) { // если по нужному пути в second есть этот ключ
        console.log('по нужному пути в second есть этот ключ');
        if (_.get(first, key) === _.get(second, key)) { // если нет изменений
          console.log('нет изменений');
          const newStrAcc = `     ${key}: ${_.get(second, key)}\n`;
          console.log(newStrAcc);
          return `${strAcc}${newStrAcc}`;
        } // если есть изменения
        console.log('есть изменения');
        const newStrAcc = `   + ${key}: ${_.get(second, key)}\n   - ${key}: ${_.get(first, key)}\n`;
        console.log(newStrAcc);
        return `${strAcc}${newStrAcc}`;
      } // нет нужного ключа по нужному пути
      console.log('нет нужного ключа по нужному пути');
      const newStrAcc = `   + ${key}: ${_.get(second, key)}\n`;
      console.log(newStrAcc);
      return `${strAcc}${newStrAcc}${hasDeletedRender(first, second)}`;
    }
    // если по ключу объект
    console.log('по ключу объект');
    if (_.has(first, key)) { // если по нужному пути в first есть этот ключ
      console.log('по нужному пути в first есть этот ключ');
      if (typeof _.get(first, key) === 'object') { // если first[key] тоже объект
        console.log('first[key] тоже объект');
        console.log(Object.keys(_.get(second, key)));
        const newStrAcc = `     ${key}: ${render(_.get(first, key), _.get(second, key))}\n`;
        console.log(newStrAcc);
        return `${strAcc}${newStrAcc}${hasDeletedRender(first, second)}`;
      } // если first[key] теперь строка
      console.log('first[key] теперь строка');
      const newStrAcc = `   + ${key}: ${_.get(second, key)}\n   - ${key}: ${_.get(first, key)}`;
      console.log(newStrAcc);
      return `${strAcc}${newStrAcc}${hasDeletedRender(first, second)}`;
    }
    // если нет этого ключа
    console.log('нет этого ключа');
    const newStrAcc = `   - ${key}: ${_.get(first, key)}\n`;
    console.log(newStrAcc);
    return `${strAcc}${newStrAcc}${hasDeletedRender(first, second)}`;
  }, '{\n');
  // console.log(rendering);
  return `${rendering}`;
};

const renderer = (first, second) => `\n${render(first, second)}\n${hasDeletedRender(first, second)}}`;

const parseAST = () => {

};

const compare = () => {

};

export {
  renderer, parseAST, compare,
};
