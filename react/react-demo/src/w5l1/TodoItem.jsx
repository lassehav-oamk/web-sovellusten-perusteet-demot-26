export default function TodoItem({ todo, doneButtonClicked }) {

    //const styles = { color: "red", textDecoration: "line-through" };
    const styles = {};
    if(todo.done == true) {
        styles.textDecoration = "line-through";
    }

    return (
        <li>
        <span style={ styles }>{todo.title}</span>
        <button onClick={() => doneButtonClicked(todo.id)}>Done</button>
        <button>Muokkaa</button>
        <button>Poista</button>
        </li>
    );
}
