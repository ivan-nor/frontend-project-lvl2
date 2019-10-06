import _ from 'lodash';

const getStrValue = value => (_.isObject(value) ? '[complex value]' : value);

const astToPlain = (ast) => {
  const iter = (tree, accName = '') => {
    const nodes = tree
      .filter(({ type }) => type !== 'unchanged')
      .map(({
        name, type, nextValue, prevValue, children,
      }) => {
        const newAccName = !accName ? `${name}` : `${accName}.${name}`;
        switch (type) {
          case 'nested': {
            return iter(children, newAccName);
          }
          case 'added': {
            return `Property '${newAccName}' was added with value: ${getStrValue(nextValue)}`;
          }
          case 'deleted': {
            return `Property '${newAccName}' was removed`;
          }
          case 'changed': {
            return `Property '${newAccName}' was updated. From ${getStrValue(prevValue)} to ${getStrValue(nextValue)}`;
          }
          default:
            throw new Error('unexpected type of node');
        }
      });
    return nodes.join('\n');
  };
  return iter(ast);
};

export default astToPlain;
