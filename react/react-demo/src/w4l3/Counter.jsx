import { useState } from 'react'

export default function Counter() {
    //let count = 0;
    const [count, setCount] = useState(0);

    function handleClick() {
        //count = count + 1;
        console.log("Ennen: " + count)
        setCount(count + 1)
        console.log("Jälkeen: " + count);
    }

    function handleClick10() {
      setCount(count + 10);
    }

    return (
      <div>
        <h1>Toimiva counter alla</h1>
        <button onClick={ handleClick }>
            Kasvata +1
        </button>
        <button onClick={ () => setCount(count + 10) }>
          Kasvata +10
        </button>
        <div>
          Laskuri: { count }
        </div>
      </div>
    )
}
