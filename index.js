const app = require('./server/app');
const port = process.env.PORT || 9000;
const http = require('http');

http.createServer(app).listen(port, () => {
  console.log(`Server listening on ${port}`)
});


