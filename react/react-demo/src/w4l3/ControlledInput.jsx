import { useState } from 'react'

export default function ControlledInput() {
    const [textValue, setTextValue] = useState("");

    function handleChange(event) {
        console.log('change')
        console.log(event.target.value)
        setTextValue(event.target.value + "Pöö")
    }

    return (
        <div>
            Controlled input demo
            <div>
                <input type="text" value={ textValue } onChange={ handleChange } />
            </div>
        </div>
    )
}
