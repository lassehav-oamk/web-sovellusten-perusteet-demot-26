import React from 'react'

export default function ProductCard(props) {

    console.log(props);

    let stockInfo = "Kyllä";
    if(props.inStock == false) {
        stockInfo = "Ei"
    }


    return (
        <article>
            <h2>{ props.name }</h2>
            <p>€ { props.price }</p>
            <p>Varastossa: { stockInfo }</p>
            <p>Varastossa: { props.inStock ? "Kyllä" : "Ei" }</p>
            <p>Varastomäärä: { props.stockQty }</p>
        </article>
    )
}
