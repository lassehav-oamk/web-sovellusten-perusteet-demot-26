import React from 'react'

export default function BadCounter() {
    let count = 0;

    function handleClick() {
        count = count + 1;
        console.log(count);
    }

  return (
    <button onClick={ handleClick }>
        Painettu {count} kertaa
    </button>
  )
}
