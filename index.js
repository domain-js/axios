const axios = require("axios");
const Before = require("./Before");

function Axios(cnf, deps, axiosError) {
  if (!cnf.axios) cnf.axios = {};
  const { loggers, retrys, retryTimes, retryIntervalMS, conf } = cnf.axios;
  const {
    U: { sleep },
    logger
  } = deps;

  const retryAble = (fn, times, interval) => {
    const exec = async (args, no) => {
      try {
        const res = await fn(...args);
        return res;
      } catch (e) {
        if (e.code === "ETIMEDOUT") {
          if (interval) await sleep(interval);
          if (times <= no) throw e;
          return exec(args, no + 1);
        }
        throw e;
      }
    };

    return (...args) => exec(args, 1);
  };

  const instance = axios.create(conf);

  if (loggers) {
    for (const x of loggers) {
      console.log(`axios.${x} logger.logger`);
      instance[x] = logger.logger(instance[x], `axios.${x}`, true, res => res.data, axiosError);
    }
  }

  if (retrys) {
    for (const x of retrys) {
      instance[x] = retryAble(instance[x], retryTimes, retryIntervalMS);
    }
  }

  instance.origin = { ...axios };

  return instance;
}

Axios.Deps = ["logger", "utils"];
Axios.Before = Before;

module.exports = Axios;
