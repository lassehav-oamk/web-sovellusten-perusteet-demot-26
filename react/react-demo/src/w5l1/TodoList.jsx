import React, { useState } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo';


//export default function TodoList() {
export default function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Lue Reactin state-osio', done: true },
        { id: 2, title: 'Tee Todo-harjoitus', done: false },
        { id: 3, title: 'Palauta tehtävä', done: false },
    ]);

    const [addModeActive, setAddModeActive] = useState(false);

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

    function deleteItem(id) {
        console.log('deleteItem id:' + id)
        const nextTodos = todos.filter((todo) => todo.id !== id); 
        setTodos(nextTodos); 
    }

    let output;
    if(addModeActive) {
        output = <AddTodo cancelButtonClick={() => setAddModeActive(false)}/>
    } else {
        output = 
            <div>
                <button onClick={() => setAddModeActive(true)}>Lisää uusi</button>
                <ul>
                    {todos.map((todo) => (
                        <TodoItem 
                            key={todo.id} 
                            todo={todo} 
                            doneButtonClicked={toggleTodo}
                            deleteButtonClicked={deleteItem}
                        />
                    ))}
                </ul>
            </div>
    }

    return (
        <div>
            { output }
        </div>
    );
}

