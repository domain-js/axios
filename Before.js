module.exports = (cnf, deps) => {
  /**
   * 请求错误的处理函数，返回错误[code, message]
   * @memberof U
   *
   * @param {error} e 发起请求得到的 error 对象
   *
   * @return {Array<string|number, string>} [code, message]
   */
  const axiosError = e => {
    if (!e.response) return ["no-response", e.message];
    const r = e.response;
    if (!r.data) return [r.status, r.statusText];
    const d = r.data;
    if (typeof d === "string") return [r.status, d];
    return [d.code || r.status, d.message || d];
  };

  return [cnf, deps, axiosError];
};
