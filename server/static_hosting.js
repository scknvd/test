const express = require('express');

const app = express();

app.use(express.static('statics'))

app.listen(9990);