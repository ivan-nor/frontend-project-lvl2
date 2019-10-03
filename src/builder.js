import _ from 'lodash';

const buildInternalTree = (beforeData, afterData) => {
  const result = _
    .union(_.keys(beforeData), _.keys(afterData))
    .map((key) => {
      const name = key;
      if (_.isObject(beforeData[key]) && _.isObject(afterData[key])) {
        return {
          name,
          type: 'nested',
          nextValue: buildInternalTree(beforeData[key], afterData[key]),
        };
      }
      if (beforeData[key] === afterData[key]) {
        return {
          name,
          type: 'unchanged',
          nextValue: beforeData[key],
        };
      }
      if (!_.has(afterData, name) && _.has(beforeData, name)) {
        return {
          name,
          type: 'deleted',
          nextValue: beforeData[key],
        };
      }
      if (!_.has(beforeData, name) && _.has(afterData, name)) {
        return {
          name,
          type: 'added',
          nextValue: afterData[key],
        };
      }
      return {
        name,
        type: 'changed',
        nextValue: afterData[key],
        prevValue: beforeData[key],
      };
    });
  return result;
};

export default buildInternalTree;
