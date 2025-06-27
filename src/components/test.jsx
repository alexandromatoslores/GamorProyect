import { useState } from "react"

export default function Padre() {
    const [texto, setTexto] = useState("Texto original")

    return (
        <Hijo texto={texto} setTexto={setTexto} />
    )
}

function Hijo({ texto, setTexto }) {
    function handleClick() {
        texto === "Texto original" ? setTexto('Texto cambiado') : setTexto('Texto original')
    }

    return (
        <div>
            <p>{texto}</p>
            <button onClick={handleClick}>Cambiar</button>
        </div>
    )
}