const API_URL = 'http://localhost:3000/todos';

const input = document.getElementById('todo-input');
const btn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

async function fetchTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.style.textDecoration = todo.done ? 'line-through' : 'none';
        li.onclick = () => toggleDone(todo.id);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.onclick = (e) => { e.stopPropagation(); deleteTodo(todo.id); };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

async function addTodo() {
    const text = input.value;
    if (!text) return;
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    input.value = '';
    fetchTodos();
}

async function toggleDone(id) {
    await fetch(`${API_URL}/${id}`, { method: 'PUT' });
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

btn.addEventListener('click', addTodo);
fetchTodos();
