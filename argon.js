require('babel-register');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan')('dev');
const cors = require('cors');
const { authenticate } = require('./src/lib/authControl');
const { checkAndChange } = require('./src/lib/utils');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan);

app.use('/', (req, res, next) => {
  if (authenticate(req.body.password) === true) next();
  else res.json(checkAndChange(new Error('Authentication failed')));
});

if(process.env.ENV === 'development') {
  const tests = require('./src/routes/test');
  app.use('/tests/', tests);
}

app.listen(process.env.PORT, () => {
  console.log(`Argon mode : ${process.env.ENV}`);
  console.log(`Started on  ${process.env.HOST}:${process.env.PORT}`);
});
