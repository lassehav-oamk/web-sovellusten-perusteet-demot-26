import { useState } from 'react'; 
import { euro } from '../api.js'; 

export default function Cart({ 
  cart, onQuantity, onRemove, onOrder, sending, 
}) { 
  const [customerName, setCustomerName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const total = cart.reduce( 
    (sum, item) => sum + item.price_cents * item.quantity, 0, 
  ); 

  function submit(event) { 
    event.preventDefault(); 
    onOrder({ customerName, email }); 
  } 

  if (cart.length === 0) return <h1>Ostoskori on tyhjä</h1>; 

  return ( 
    <section> 
      <h1>Ostoskori</h1> 
      
      <form onSubmit={submit}> 
        <fieldset disabled={sending}> 
          <legend>Tuotteet ja tilaajan tiedot</legend> 
          {cart.map((item) => ( 
            <article className="card" key={item.id}> 
              <h2>{item.name}</h2> 
              <p>{euro(item.price_cents)} / kpl</p> 
              <label htmlFor={`qty-${item.id}`}>Määrä</label> 
              <input id={`qty-${item.id}`} type="number" min="1" 
                max={Math.min(item.stock, 99)} step="1" required 
                value={item.quantity} 
                onChange={(event) => onQuantity( 
                  item.id, Number(event.target.value), 
                )} /> 

              <p>Rivisumma: {euro(item.price_cents * item.quantity)}</p> 
              <button type="button" onClick={() => onRemove(item.id)}> 
                Poista {item.name} 
              </button> 
            </article> 
          ))} 

          <p><strong>Yhteensä: {euro(total)}</strong></p> 

          <p>Palvelin tarkistaa lopullisen hinnan ja saatavuuden.</p> 

          <label htmlFor="customer-name">Nimi (käytä keksittyä nimeä)</label> 
          <input id="customer-name" required minLength="2" maxLength="100" 
            value={customerName} 
            onChange={(event) => setCustomerName(event.target.value)} /> 

          <label htmlFor="email">Sähköposti (esim. demo@example.com)</label> 
          <input id="email" type="email" required maxLength="254" 
            value={email} onChange={(event) => setEmail(event.target.value)} /> 
          <button type="submit"> 
            {sending ? 'Tallennetaan...' : 'Tilaa ja näytä demolasku'} 
          </button> 

        </fieldset> 
      </form> 
    </section> 
  ); 
} 