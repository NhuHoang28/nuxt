import {get} from 'lodash';

const CONFIG = {
  constants: {
    historyTypes: {
      income: 0,
      expense: 1,
      tranfer: 2,
    },
    statusCodes: {
      unauthorized: 401,
      validation: 422,
      forbidden: 403,
      notFound: 404,
    },
  },
};

const useConfig = () => {
  const getConfig = (
    keyPath: string,
    defaultValue?: any,
  ): any => get(CONFIG, keyPath, defaultValue);
  return {getConfig};
};

export default useConfig;
