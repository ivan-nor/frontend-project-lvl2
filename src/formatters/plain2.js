import _ from 'lodash';

const astToPlain = (ast) => {
  const iter = (tree, accName = '') => {
    const nodes = tree
      .filter(({ type }) => type !== 'unchanged')
      .map(({
        name, type, nextValue, prevValue,
      }) => {
        const newAccName = !accName ? `${name}` : `${accName}.${name}`;
        switch (type) {
          case 'nested': {
            return iter(nextValue, newAccName);
          }
          case 'added': {
            const newValue = _.isObject(nextValue) ? '[complex value]' : nextValue;
            return `Property '${newAccName}' was added with value: ${newValue}`;
          }
          case 'deleted': {
            return `Property '${newAccName}' was removed`;
          }
          case 'changed': {
            const newPrevValue = _.isObject(prevValue) ? '[complex value]' : prevValue;
            const newNextValue = _.isObject(nextValue) ? '[complex value]' : nextValue;
            return `Property '${newAccName}' was updated. From ${newPrevValue} to ${newNextValue}`;
          }
          default:
            throw new Error('unexpected type of node');
        }
      });
    // console.log(nodes);
    return nodes.join('\n');
  };
  const resultArr = iter(ast);
  // console.log(resultArr);
  return resultArr;
};

export default astToPlain;
