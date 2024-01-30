const express = require('express')
const ownerRouter = require('./routes/ownerRoutes')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/v1', ownerRouter);
module.exports = app;
