import React from 'react'

export default function AddTodo({ cancelButtonClick }) {
  return (
    <div>
        <h1>Uusi tehtävä</h1>
        <input type="text" />
        <div>
            <button onClick={cancelButtonClick}>Peru</button>
            <button>Tallenna</button>
        </div>
    </div>
  )
}
