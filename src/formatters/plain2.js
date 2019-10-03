import _ from 'lodash';

const astToPlain = (ast) => {
  const iter = (tree, accName = '') => {
    const nodes = tree.map(({
      name, type, nextValue, prevValue,
    }) => {
      const newAccName = !accName ? `${name}` : `${accName}.${name}`;
      switch (type) {
        case 'nested': {
          return iter(nextValue, newAccName);
        }
        case 'unchanged': {
          return '';
        }
        case 'added': {
          const newValue = _.isObject(nextValue) ? '[complex value]' : nextValue;
          return `\nProperty '${newAccName}' was added with value: ${newValue}`;
        }
        case 'deleted': {
          return `\nProperty '${newAccName}' was removed`;
        }
        case 'changed': {
          const newPrevValue = _.isObject(prevValue) ? '[complex value]' : prevValue;
          const newNextValue = _.isObject(nextValue) ? '[complex value]' : nextValue;
          return `\nProperty '${newAccName}' was updated. From ${newPrevValue} to ${newNextValue}`;
        }
        default:
          return '';
      }
    });
    return nodes.join('');
  };
  return iter(ast, '');
};

export default astToPlain;
