import React, { useState } from 'react'
import TodoItem from './TodoItem'


//export default function TodoList() {
export default function TodoList() {

    // const todos = [
    //     { id: 1, title: 'Lue Reactin state-osio', done: true },
    //     { id: 2, title: 'Tee Todo-harjoitus', done: false },
    //     { id: 3, title: 'Palauta tehtävä', done: false },
    // ];

    const [todos, setTodos] = useState([
        { id: 1, title: 'Lue Reactin state-osio', done: true },
        { id: 2, title: 'Tee Todo-harjoitus', done: false },
        { id: 3, title: 'Palauta tehtävä', done: false },
    ]);

    function toggleTodo(id) {
        console.log('toggleTodo id:' + id)
        const nextTodos = todos.map((todo) => {
            if (todo.id === id) {
                // AUKKO 2:
                // Palauta uusi todo-olio, jossa done on päinvastainen.
                todo = {...todo, done: !todo.done}
                //todo = { id: todo.id, title: todo.title, done: todo.done, done: !todo.done }
            }

            return todo;
        });

        setTodos(nextTodos);
    }

    return (
    <ul>
        {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} doneButtonClicked={toggleTodo}/>
        ))}
    </ul>
    );
}

