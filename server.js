var StaticServer = require('static-server');

var port = 4000;

var server = new StaticServer({
  rootPath: './public/',
  port,
});

server.start(() => {
  console.log(`server started on port ${port}`);
});