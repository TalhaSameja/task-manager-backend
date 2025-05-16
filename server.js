const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET = 'mysecretkey';

app.use(cors());
app.use(bodyParser.json());


let tasks = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build a task app' }
];


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


app.post('/api/login', (req, res) => {
  const user = { username: 'test' };
  const token = jwt.sign(user, SECRET, { expiresIn: '1h' });
  res.json({ token });
});


app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/api/tasks', authenticateToken, (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text required' });

  const newTask = { id: Date.now(), text };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: 'Task deleted' });
});


app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => res.status(500).json({ error: 'Server error' }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
