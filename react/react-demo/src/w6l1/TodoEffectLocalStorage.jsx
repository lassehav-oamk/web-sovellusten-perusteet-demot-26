import { useEffect, useState } from 'react';
import useDocumentTitle from './hooks/useDocumentTitle';


const STORAGE_KEY = 'todos';

export default function TodoEffectLocalStorage() {
  const [todos, setTodos] = useState(() => {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  });

  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);


  function addTodo(event) {
    event.preventDefault();

    if (!newTodo.trim()) return;

    setTodos([...todos, newTodo.trim()]);
    setNewTodo('');
  }

  return (
    <div>
      <h1>Tehtävät</h1>

      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Uusi tehtävä"
        />
        <button type="submit">Lisää</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

