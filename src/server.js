const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
