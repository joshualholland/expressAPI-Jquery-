const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes');

let app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, '../client')));





app.listen(3000);