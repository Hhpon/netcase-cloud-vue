var express = require('express')

var app = express()

app.use(express.static('./dist'))

app.listen(9000, () => {
  console.log('server is listening on port 9000');
})