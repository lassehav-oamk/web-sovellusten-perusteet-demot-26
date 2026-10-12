import { euro } from '../api.js'; 

export default function Invoice({ order }) { 

  if (!order) return <p>Laskua ei ole valittu.</p>; 

  return ( 
    <section className="card invoice"> 
      <h1>Demolasku {order.invoice_number}</h1> 
      <p><strong>EI MAKSETTAVA. Sähköpostia ei ole lähetetty.</strong></p> 
      <p>Myyjä: Pieni demokauppa (kuvitteellinen)</p> 
      <p>Vastaanottaja: {order.customer_name}, {order.email}</p> 
      <p>Päiväys: {new Date(order.created_at).toLocaleDateString('fi-FI')}</p> 
      <p>Demoeräpäivä: {new Date(order.due_at).toLocaleDateString('fi-FI')}</p> 
      <div className="table-scroll"> 
        <table> 
          <thead>
            <tr> 
                <th>Tuote</th><th>Määrä</th><th>Kpl-hinta</th><th>Yhteensä</th> 
            </tr>
          </thead> 

          <tbody>{order.items.map((item) => ( 
            <tr key={item.product_id}> 
              <td>{item.product_name}</td><td>{item.quantity}</td> 
              <td>{euro(item.price_cents)}</td> 
              <td>{euro(item.price_cents * item.quantity)}</td> 
            </tr> 
          ))}
          </tbody> 
        </table> 
      </div> 

      <p><strong>Kokonaissumma: {euro(order.total_cents)}</strong></p> 
      <p>Opetuskäyttöön. Ei maksamista, toimitusta tai veroerittelyä.</p> 
      <button className="no-print" onClick={() => window.print()}> 
        Tulosta demolasku 
      </button> 
    </section> 
  ); 
} 