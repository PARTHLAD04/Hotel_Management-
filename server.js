const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser');
const Menu = require('./models/Menu')
const personRouter = require('./routers/personRouter')
const menuRouter = require('./routers/menuRouter')
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express()

app.use(bodyParser.json());
app.use('/person',personRouter );
app.use('/menu', menuRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Hotel ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
