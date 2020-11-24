const express = require('express')
const server = express();

const hostname = '0.0.0.0';
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinodejs')
// moongoose.connect('mongodb://localhost:27017/apinodejs');  // Without docker

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

const commentRoute = require('./api/routes/commentRoute');
const postRoute = require('./api/routes/postRoute');
const userRoute = require('./api/routes/userRoute');

postRoute(server);
commentRoute(server);
userRoute(server);

server.listen(port, hostname);