const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    const newTodo = { id: Date.now(), text, done: false };
    todos.push(newTodo);
    res.json(newTodo);
});


app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == id);
    if (todo) {
        todo.done = !todo.done;
        res.json(todo);
    } else {
        res.status(404).send('No encontrado');
    }
});


app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id != id);
    res.json({ success: true });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
