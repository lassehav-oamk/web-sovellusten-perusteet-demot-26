import express from 'express'; 
import path from 'node:path'; 
import { 
  db, listCategories, listProducts, listOrders, getOrder, createOrder, 
} from './db.js'; 

const app = express(); 
const port = Number(process.env.PORT || 3000); 
const host = process.env.HOST || '0.0.0.0';

app.use(express.json({ limit: '20kb' })); 

app.use('/api', (req, res, next) => { 
  res.set('Cache-Control', 'no-store'); 
  next(); 
}); 

app.get('/api/categories', (req, res) => res.json(listCategories())); 

app.get('/api/products', (req, res) => res.json(listProducts())); 

 

// OPEN DEMO: this is not a protected admin API. 
app.get('/api/orders', (req, res) => res.json(listOrders())); 
app.get('/api/orders/:id', (req, res) => { 

  const id = Number(req.params.id); 

  if (!Number.isSafeInteger(id) || id < 1) { 
    return res.status(400).json({ error: 'Virheellinen tilausnumero.' }); 
  } 

  const order = getOrder(id); 
  if (!order) return res.status(404).json({ error: 'Tilausta ei löydy.' }); 
  res.json(order); 
}); 

app.post('/api/orders', (req, res) => { 

  if (!req.is('application/json')) { 
    return res.status(415).json({ error: 'Käytä application/json-muotoa.' }); 
  } 

  const order = createOrder(req.body); 
  res.location(`/api/orders/${order.id}`).status(201).json(order); 
}); 

 

// Unknown API paths must not return the HTML frontend. 
app.use('/api', (req, res) => { 
  res.status(404).json({ error: 'Rajapinnan osoitetta ei löydy.' }); 
}); 

// Production: also serve the Vite build. 
const clientDist = path.join(import.meta.dirname, '..', 'client', 'dist'); 
app.use(express.static(clientDist)); 
app.use((req, res) => res.status(404).send('Sivua ei löydy.')); 


// Express recognizes an error handler by its four parameters. 
app.use((error, req, res, next) => { 
  if (res.headersSent) return next(error); 

  if (error.type === 'entity.parse.failed') { 
    return res.status(400).json({ error: 'Virheellinen JSON.' }); 
  } 

  const status = Number.isInteger(error.status) 
    && error.status >= 400 && error.status < 500 ? error.status : 500; 

  if (status === 500) console.error(error); 
  const message = status === 500 ? 'Palvelimella tapahtui virhe.' 
    : status === 413 ? 'Liian suuri pyyntö.' : error.message; 
  res.status(status).json({ error: message }); 

}); 

const server = app.listen(port, host, () => { 
  console.log(`Palvelin: http://${host}:${server.address().port}`); 
}); 

function stop() { 
  server.close(() => { 
    db.close(); 
    process.exit(0); 
  }); 
} 

process.on('SIGINT', stop); 
process.on('SIGTERM', stop); 
