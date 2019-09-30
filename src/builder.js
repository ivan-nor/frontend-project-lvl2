import _ from 'lodash';

const buildInternalTree = (beforeData, afterData) => {
  const result = _
    .union(_.keys(beforeData), _.keys(afterData))
    .map((key) => {
      const name = key;
      if (typeof beforeData[key] === 'object' && typeof afterData[key] === 'object') {
        return {
          name,
          type: 'unchanged',
          value: buildInternalTree(beforeData[key], afterData[key]),
        };
      }
      if (beforeData[key] === afterData[key]) {
        return {
          name,
          type: 'unchanged',
          value: beforeData[key],
        };
      }
      if (!_.has(afterData, name) && _.has(beforeData, name)) {
        return {
          name,
          type: 'deleted',
          value: beforeData[key],
        };
      }
      if (!_.has(beforeData, name) && _.has(afterData, name)) {
        return {
          name,
          type: 'added',
          value: afterData[key],
        };
      }
      return {
        name,
        type: 'changed',
        value: afterData[key],
        prevValue: beforeData[key],
      };
    });
  return result;
};

export default buildInternalTree;
