import _ from 'lodash';

const plainAst = (ast) => {
  const iter = (accName, tree) => {
    const nodes = tree.reduce((acc, {
      name, type, nextValue, prevValue,
    }) => {
      const newAccName = !accName ? `${name}` : `${accName}.${name}`;
      switch (type) {
        case 'nested': {
          return [...acc, iter(newAccName, nextValue)];
        }
        case 'unchanged': {
          return acc;
        }
        case 'added': {
          const newValue = _.isObject(nextValue) ? '[complex value]' : nextValue;
          return [...acc, `\nProperty '${newAccName}' was added with value: ${newValue}`];
        }
        case 'deleted': {
          return [...acc, `\nProperty '${newAccName}' was removed`];
        }
        case 'changed': {
          const newPrevValue = _.isObject(prevValue) ? '[complex value]' : prevValue;
          const newNextValue = _.isObject(nextValue) ? '[complex value]' : nextValue;
          return [...acc, `\nProperty '${newAccName}' was updated. From ${newPrevValue} to ${newNextValue}`];
        }
        default:
          return acc;
      }
    }, []);
    return nodes.join('');
  };
  return iter('', ast);
};

export default plainAst;
