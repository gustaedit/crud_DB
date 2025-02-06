const express = require('express');
require('dotenv').config();
const cors = require('cors');
const todosRoutes = require('./todos.routs');
const app = express();

app.use(express.json());
app.use(cors());
app.use(todosRoutes);

app.get('/health', (req, res) => {
    return res.json({ message: 'Hello World' });
});

app.listen(3333,()=>console.log('Server is running on port 3333'));