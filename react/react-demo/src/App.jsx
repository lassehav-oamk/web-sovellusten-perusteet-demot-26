import Tervehdys from './w4l1/Tervehdys'
import DateNow from './w4l1/DateNow';
import ProductCard from './w4l2/ProductCard';

function App() {

  //const nimi = "Jaakko";

  const products = [
    {
      id: 123,
      name: "Porkkana",
      price: 2.50,
      inStock: true,
      qty: 6
    },
    {
      id: 88322,
      name: "Peruna",
      price: 0.8,
      inStock: false,
      qty: 0
    },
    {
      id: 21357,
      name: "Omena",
      price: 3.00,
      inStock: true,
      qty: 50
    },
    {
      id: 25436437,
      name: "Päärynä",
      price: 3.10,
      inStock: false,
      qty: 0
    }
  ];
  
  return (
    <div>
      <ProductCard name="Porkkana" price={2.50} inStock={true}/>
      <ProductCard name="Peruna 1kg" price={0.80} inStock={false} />
      <ProductCard name="Omenaa 2kg" price={3.00} inStock={true}/>

      <h1>Map esimerkki alla</h1>
      {
        products.map(product => 
          <ProductCard 
            key={product.id}
            name={product.name} 
            price={product.price} 
            inStock={product.inStock}
            stockQty={product.qty}
          />)
      }

      {/* W4L1
      <div>Hello world</div>
      <Tervehdys />
      <Tervehdys />
      <Tervehdys />
      <Tervehdys />
      <Tervehdys />
      <Tervehdys />
      <DateNow />
      <DateNow />
      <DateNow /> */}
    </div>
  )
}

export default App
