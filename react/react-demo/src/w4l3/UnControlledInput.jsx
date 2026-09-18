import React from 'react'

export default function UnControlledInput() {

    function handleChange(event) {
        console.log('change')
        console.log(event.target.value)
    }

    return (
        <div>
            Uncontrolled input demo
            <div>
                <input type="text" onChange={ handleChange } />
            </div>
        </div>
    )
}
