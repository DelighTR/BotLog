const express = require('express');
const app = express();
const port = 3000 || 8080;

app.all('/', (req, res) => {
  // res.setHeader('Content-Type', 'text/html');
  res.send(`7/24 KeepAlive Sunucusu Aktif!`);
  res.end();
});

function k() {
  app.listen(port, () => {
    console.log("7/24 KeepAlive Sunucusu Aktif!".bgGreen.white)
  });
}
module.exports = k;