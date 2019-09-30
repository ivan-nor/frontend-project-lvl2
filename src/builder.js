import _ from 'lodash';

const buildInternalTree = (beforeData, afterData) => {
  const result = _
    .union(_.keys(beforeData), _.keys(afterData))
    .map((nodeName) => {
      if (typeof beforeData[nodeName] === 'object' && typeof afterData[nodeName] === 'object') {
        return {
          nodeName,
          type: 'unchanged',
          value: buildInternalTree(beforeData[nodeName], afterData[nodeName]),
        };
      }
      if (beforeData[nodeName] === afterData[nodeName]) {
        return {
          nodeName,
          type: 'unchanged',
          value: beforeData[nodeName],
        };
      }
      if (!_.has(afterData, nodeName) && _.has(beforeData, nodeName)) {
        return {
          nodeName,
          type: 'deleted',
          value: beforeData[nodeName],
        };
      }
      if (!_.has(beforeData, nodeName) && _.has(afterData, nodeName)) {
        return {
          nodeName,
          type: 'added',
          value: afterData[nodeName],
        };
      }
      return {
        nodeName,
        type: 'changed',
        value: afterData[nodeName],
        prevValue: beforeData[nodeName],
      };
    });
  return result;
};

export default buildInternalTree;
