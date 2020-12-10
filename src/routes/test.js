const express = require('express');
const { checkAndChange } = require('../lib/utils');
const Tests = require('../classes/test-class')();

const app = express.Router();

app.get('/basictest', async (req, res) => {
  const te = await Tests.testApp();
  res.json(checkAndChange(te));
});

module.exports = app;
