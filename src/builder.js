import _ from 'lodash';

const buildInternalTree = (first, second) => {
  const allKeys = _.union(_.keys(first), _.keys(second));
  const result = allKeys.reduce((acc, key) => {
    const node = { name: key };
    if (typeof first[key] === 'object' && typeof second[key] === 'object') {
      node.type = 'unchanged';
      node.value = buildInternalTree(first[key], second[key]);
      return [...acc, node];
    }
    if (first[key] === second[key]) {
      node.type = 'unchanged';
      node.value = first[key];
      return [...acc, node];
    }
    if (!_.has(second, key) && _.has(first, key)) {
      node.type = 'deleted';
      node.value = first[key];
      return [...acc, node];
    }
    if (!_.has(first, key) && _.has(second, key)) {
      node.type = 'added';
      node.value = second[key];
      return [...acc, node];
    }
    if (first[key] !== second[key]) {
      node.type = 'changed';
      node.value = second[key];
      node.prevValue = first[key];
    }
    return [...acc, node];
  }, []);
  return result;
};

export default buildInternalTree;
