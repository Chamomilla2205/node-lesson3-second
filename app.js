const path = require('path');
const express = require('express');
const apiRouter = require('./router/api.router');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', apiRouter);

app.listen(4500, () => {
    console.log('App listen 4500')
})

