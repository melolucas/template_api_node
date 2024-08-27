const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);

app.use(errorHandler);

module.exports = app;
