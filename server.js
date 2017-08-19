const express = require('express');
const path = require('path');
const db = require('./models');


const app = express();
app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/api', require('./api/'));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Port ${port} is a beautiful port`));

db.seed();
