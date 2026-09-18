import { useState } from 'react'

export default function MyName() {

    const [myNameVisibleText, setMyNameVisibleText] = useState("")
    const [inputText, setInputText] = useState("");

    function nameChecker() {
        console.log("tööt")
        // katsotaan mitä tekstikentässä lukee
        // jos oma nimi, niin laitetaan "minun nimi!" näkyviin
        if(inputText == "Lasse") {
            setMyNameVisibleText("Minun nimi!")
        } else {
            setMyNameVisibleText("")
        }
        
    }

    function textChange(event) {
        setInputText(event.target.value)
    }

    return (
        <div>
            MyName harjoitus
            <div>
                <input type="text" onChange={ textChange } />
                <button onClick={ nameChecker }>Tarkista</button>
            </div>
            <div>
                { myNameVisibleText }
            </div>
        </div>
    )
}
