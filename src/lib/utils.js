/** Utils functions */

/** Response format in case of success */
exports.success = (result) => ({ status: 'success', result });

/** Response format in case of error */
exports.error = (message) => ({ status: 'error', message });

/** Check if returned object is an Error */
exports.isErr = (err) => (err instanceof Error);

/** Return good format of response */
exports.checkAndChange = (obj) => {
  if (this.isErr(obj)) {
    return (this.error(obj.message));
  } return (this.success(obj));
};
