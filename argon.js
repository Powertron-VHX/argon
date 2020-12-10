const connect = require('connect');
const http = require('http');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan')('dev');
const cors = require('cors');
const { authenticate } = require('./src/lib/authControl');
const { checkAndChange } = require('./src/lib/utils');

const app = connect();

app.use(compression());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan);

app.use('/rest', (req, res, next) => {
  if (authenticate(req.body.password)) next();
  else res.end(checkAndChange(new Error('Authentication failed')));
});

app.use((req, res) => {
  res.end('Hello from Connect!\n');
});

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Argon mode : ${process.env.ENV}`);
  console.log(`Started on  ${process.env.HOST}:${process.env.PORT}`);
});
