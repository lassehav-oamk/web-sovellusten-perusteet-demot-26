import React, { useState } from 'react'

export default function AddTodo({ cancelButtonClick, saveTodoButtonClick }) {
    const [todoText, setTodoText] = useState("")


  return (
    <div>
        <h1>Uusi tehtävä</h1>
        <input type="text" onChange={ (event) => setTodoText(event.target.value) } />
        <div>
            <button onClick={cancelButtonClick}>Peru</button>
            <button onClick={ () => saveTodoButtonClick(todoText) }>Tallenna</button>
        </div>
    </div>
  )
}
