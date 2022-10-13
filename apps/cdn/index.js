const express = require('express');
const {join} = require('path');

const app = express();

app.use(express.static(join(__dirname, 'public')));

app.listen(3003, () => console.log('> CDN Listen on port 3003'));
