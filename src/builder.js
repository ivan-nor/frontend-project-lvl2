import _ from 'lodash';

const buildInternalTree = (first, second) => {
  const allKeys = _.union(_.keys(first), _.keys(second));
  const result = allKeys.reduce((acc, key) => {
    const node = {
      name: key,
      type: '',
      value: [],
    };
    if (typeof _.get(first, key) === 'object' && typeof _.get(second, key) === 'object') {
      // оба значения объекты
      node.type = 'unchanged';
      node.value = buildInternalTree(_.get(first, key), _.get(second, key));
      return [...acc, node];
    }
    if (_.get(first, key) === _.get(second, key)) {
      node.type = 'unchanged';
      node.value = _.get(first, key);
      return [...acc, node];
    }
    if (!_.has(second, key) && _.has(first, key)) {
      node.type = 'deleted';
      node.value = _.get(first, key);
      return [...acc, node];
    }
    if (!_.has(first, key) && _.has(second, key)) {
      // ключ добавлен
      node.type = 'added';
      node.value = _.get(second, key);
      return [...acc, node];
    }
    if (_.get(first, key) !== _.get(second, key)) {
      // значения не равны
      node.type = 'changed';
      node.value = [_.get(second, key), _.get(first, key)];
    }
    return [...acc, node];
  }, []);
  return result;
};

export default buildInternalTree;
