const Before = require("./Before");
const axios = require("axios");

const origin = { ...axios };

function Axios({ loggers, retrys, retryTimes = 3, retryIntervalMS = 10 * 1000, conf = {} }, { U: { sleep }, logger }, axiosError) {
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

  if (methods) {
    for (const x of loggers) {
      instance[x] = logger.logger(
        instance[x],
        `axios.${x}`,
        true,
        res => res.data,
        axiosError
      );
  }

  if (retrys) {
    for (const x of retrys) {
      instance[x] = retryAble(instance[x], retryTimes, retryIntervalMS);
    }
  }

  instance.origin = origin;

  return instance;
}

Axios.Deps = ["logger", "utils"];
Axios.Before = Before;

module.exports = Axios;
