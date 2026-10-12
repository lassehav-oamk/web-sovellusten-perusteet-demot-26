import { useEffect, useState } from 'react'; 
import { api } from './api.js'; 
import Home from './components/Home.jsx'
import ProductList from './components/ProductList.jsx'; 
import ProductView from './components/ProductView.jsx'; 
import Cart from './components/Cart.jsx';
import Invoice from './components/Invoice.jsx';  

 
export default function App() { 
  // A. Yhteinen tila 
  const [categories, setCategories] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [notice, setNotice] = useState('');
  const [view, setView] = useState('home'); 
  const [categoryId, setCategoryId] = useState(null); 
  const [productId, setProductId] = useState(null); 
  const [cart, setCart] = useState([]); 
  const [invoice, setInvoice] = useState(null); 
  const [sending, setSending] = useState(false); 

  // B. Lataa kategoriat ja tuotteet 
  useEffect(() => { 
    const controller = new AbortController(); 

    async function load() { 
      try { 
        const [categoryData, productData] = await Promise.all([ 
          api('/categories', { signal: controller.signal }), 
          api('/products', { signal: controller.signal }), 
        ]); 

        setCategories(categoryData); 
        setProducts(productData); 

      } catch (err) { 
        if (!controller.signal.aborted) setError(err.message); 
      } finally { 
        if (!controller.signal.aborted) setLoading(false); 
      } 
    } 

    load(); 

    return () => controller.abort(); 
  }, []); 

 
  // C. Tapahtumankäsittelijät 
  function selectCategory(id) { 
    setCategoryId(id); 
    navigate('products'); 
  }

  function navigate(nextView) { 
    setError(''); 
    setNotice(''); 
    setView(nextView); 
  } 

  function selectProduct(id) { 
    setProductId(id); 
    navigate('product'); 
  } 

  function addToCart(product) { 
    const existing = cart.find((item) => item.id === product.id); 
    if ((existing?.quantity ?? 0) >= Math.min(product.stock, 99)) { 
      setNotice('Et voi lisätä enempää tätä tuotetta.'); 
      return; 
    } 

    setCart((current) => { 
      if (current.some((item) => item.id === product.id)) { 
        return current.map((item) => item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } : item); 
      } 
      return [...current, { ...product, quantity: 1 }]; 
    }); 

    setNotice(`${product.name} lisättiin ostoskoriin.`); 
  }

  function changeQuantity(id, quantity) { 
    const item = cart.find((row) => row.id === id); 
    if (!item || !Number.isInteger(quantity) || quantity < 1 
        || quantity > Math.min(item.stock, 99)) return; 
    setCart((current) => current.map((row) => row.id === id 
      ? { ...row, quantity } : row)); 
  } 

  function removeFromCart(id) { 
    setCart((current) => current.filter((item) => item.id !== id)); 
  } 

  async function placeOrder(customer) { 
    if (sending || cart.length === 0) return; 
    setSending(true); 
    setError(''); 
    try { 
      const order = await api('/orders', { 
        method: 'POST', 
        body: JSON.stringify({ 
          ...customer, 
          items: cart.map((item) => ({ 
            productId: item.id, quantity: item.quantity, 
          })), 
        }), 
      }); 

      setCart([]); 
      showInvoice(order); 

    } catch (err) { 
      setError(err.message); 
      return; 
    } finally { 
      setSending(false); 
    } 

    // Tilaus on jo tallennettu. Listan päivitys on erillinen haku. 
    try { 
      setProducts(await api('/products')); 
    } catch { 
      setNotice('Tilaus tallennettiin, mutta tuotelista ei päivittynyt.'); 
    } 
  }

  function showInvoice(order) { 
    setInvoice(order); 
    navigate('invoice'); 
  } 

   

  // D. Lataus ja virheet 
  if (loading) return <main><h1>Ladataan kauppaa...</h1></main>; 
  if (products.length === 0 && error) { 
    return <main><h1>Kauppaa ei voitu ladata</h1> 
      <p role="alert">{error}</p> 
      <button onClick={() => window.location.reload()}>Yritä uudelleen</button> 
    </main>; 
  } 

 

  // E. Näkymän valinta 
  let content; 
  if (view === 'products') { 
    content = <ProductList categories={categories} products={products} 
      categoryId={categoryId} onSelectCategory={selectCategory} 
      onSelectProduct={selectProduct} />; 
  } else if (view === 'product') { 
    content = <ProductView product={products.find((p) => p.id === productId)} 
      onAdd={addToCart} onBack={() => navigate('products')} />;
  }
  else if (view === 'cart') { 
    content = <Cart cart={cart} onQuantity={changeQuantity} onRemove={removeFromCart} onOrder={placeOrder} sending={false} />; 
  } 
  else if (view === 'invoice') { 
    content = <Invoice order={invoice} />; 
  } else { 
    content = <Home categories={categories} onSelectCategory={selectCategory} />; 
  } 

  // F. Yhteinen ulkoasu 
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return ( 
    <> 
      <header className="no-print"> 
        <p className="brand">Pieni verkkokauppa</p> 
        
        <nav aria-label="Päävalikko"> 
          <button disabled={sending} onClick={() => navigate('home')}>Etusivu</button> 
          <button disabled={sending} onClick={() => selectCategory(null)}>Tuotteet</button> 
          <button disabled={sending} onClick={() => navigate('cart')}>Ostoskori ({count})</button> 
        </nav> 

        <p>Opetusdemo: käytä vain keksittyjä tietoja. Ei oikeita ostoksia.</p> 
      </header> 
      <main> 
        {error ? <p className="message error" role="alert">{error}</p> : null} 
        {content} 
        {notice ? <p className="message no-print" role="status">{notice}</p> : null}
      </main> 
    </> 
  ); 
} 