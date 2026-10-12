import { euro } from '../api.js'; 

export default function ProductList({ 
  categories, products, categoryId, onSelectCategory, onSelectProduct, 
}) { 
  const shown = categories.filter( 
    (category) => categoryId === null || category.id === categoryId, 
  ); 

  return ( 
    <section> 
      <h1>Tuotteet</h1> 
      <label htmlFor="category">Kategoria</label> 
      <select id="category" value={categoryId ?? ''} 
        onChange={(event) => onSelectCategory( 
          event.target.value === '' ? null : Number(event.target.value), 
        )}> 

        <option value="">Kaikki kategoriat</option> 
        {categories.map((category) => ( 
          <option key={category.id} value={category.id}> 
            {category.name} 
          </option> 
        ))} 
      </select> 

      {shown.map((category) => ( 
        <section key={category.id}> 
          <h2>{category.name}</h2> 
          <div className="grid"> 
            {products.filter((p) => p.category_id === category.id) 
              .map((product) => ( 
                <article className="card" key={product.id}> 
                  <h3>{product.name}</h3> 
                  <p>{product.manufacturer}</p> 
                  <p>{euro(product.price_cents)}</p> 
                  <p>Varastossa: {product.stock} kpl</p> 
                  <button onClick={() => onSelectProduct(product.id)}> 
                    Katso tuote: {product.name} 
                  </button> 
                </article> 
              ))} 

          </div> 
        </section> 

      ))} 

    </section> 
  ); 
} 