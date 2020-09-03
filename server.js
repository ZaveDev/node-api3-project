const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json())
server.use(logger)
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`from logger 1: a ${req.method} request was made to ${req.url} on ${ new Date().toISOString() }`);
  next();
}


module.exports = server;
