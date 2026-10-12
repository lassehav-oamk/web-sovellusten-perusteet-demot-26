import { euro } from '../api.js'; 

export default function ProductView({ product, onAdd, onBack }) { 

  if (!product) return <p>Tuotetta ei löydy.</p>; 

  return ( 
    <section className="card"> 
      <button onClick={onBack}>Takaisin tuotteisiin</button> 
      <h1>{product.name}</h1> 
      <p>{product.description}</p> 
      <p>Valmistaja: {product.manufacturer}</p> 
      <p>Hinta: {euro(product.price_cents)}</p> 
      <p>Varastossa: {product.stock} kpl</p> 
      <button disabled={product.stock === 0} 
        onClick={() => onAdd(product)}> 
        {product.stock === 0 ? 'Loppuunmyyty' : 'Lisää ostoskoriin'} 
      </button> 

    </section> 
  ); 
} 