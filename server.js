const express = require('express');const app = express()
app .use(express.json())

const users = [];

app.post('/users', (req, res) => {

    res.status(201).json({ message: 'User created' })
})

app.get('/users', (req, res) => {
    res.json([
        { name: 'aa Doe', age: 25 },
        { name: 'Jane Doe', age: 24 }
    ])
});

app.listen(3000, () => {})