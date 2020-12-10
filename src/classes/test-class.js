const Tests = class {
  static testApp(params) {
    return new Promise((next) => {
      const test = `test is ok parametre : ${params !== undefined ? params : ''}`;
      next(test);
    });
  }

  static testError() {
    return new Promise((next) => {
      next(new Error('Error during test processing'));
    });
  }

  static testNoResponse() {
    return new Promise(() => {
    });
  }
};

module.exports = () => Tests;
