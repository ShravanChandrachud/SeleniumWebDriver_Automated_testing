const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'testuser' && password === 'password123') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
