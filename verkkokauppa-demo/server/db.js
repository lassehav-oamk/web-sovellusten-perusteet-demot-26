import { DatabaseSync } from 'node:sqlite'; 
import { mkdirSync } from 'node:fs'; 
import path from 'node:path'; 

 

// Default path is relative to this file, not the working directory. 

export const databaseFile = process.env.DB_FILE 
  ? path.resolve(process.env.DB_FILE) 
  : path.join(import.meta.dirname, 'data', 'shop.sqlite'); 
mkdirSync(path.dirname(databaseFile), { recursive: true }); 
export const db = new DatabaseSync(databaseFile); 

 

// 1. Schema. 

db.exec(` 
  PRAGMA foreign_keys = ON; 
  PRAGMA busy_timeout = 5000; 

  CREATE TABLE IF NOT EXISTS categories ( 
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL 
  ) STRICT; 

  CREATE TABLE IF NOT EXISTS products ( 
    id INTEGER PRIMARY KEY, 
    category_id INTEGER NOT NULL REFERENCES categories(id), 
    name TEXT NOT NULL, 
    description TEXT NOT NULL, 
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0), 
    stock INTEGER NOT NULL CHECK (stock >= 0), 
    manufacturer TEXT NOT NULL 
  ) STRICT; 

 

  CREATE TABLE IF NOT EXISTS orders ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    customer_name TEXT NOT NULL, 
    email TEXT NOT NULL, 
    created_at TEXT NOT NULL, 
    due_at TEXT NOT NULL, 
    total_cents INTEGER NOT NULL CHECK (total_cents >= 0) 
  ) STRICT; 

 
  CREATE TABLE IF NOT EXISTS order_items ( 
    id INTEGER PRIMARY KEY, 
    order_id INTEGER NOT NULL REFERENCES orders(id), 
    product_id INTEGER NOT NULL REFERENCES products(id), 
    product_name TEXT NOT NULL, 
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0), 
    quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 99), 
    UNIQUE (order_id, product_id) 
  ) STRICT; 

`); 

// 2. Seed only an empty database. 

if (db.prepare('SELECT COUNT(*) AS n FROM categories').get().n === 0) { 
  db.exec('BEGIN IMMEDIATE'); 
  try { 
    db.exec(` 
      INSERT INTO categories (id, name) VALUES 
        (1, 'Työpiste'), (2, 'Koti'), (3, 'Retkeily'); 
    `); 

    const insert = db.prepare(` 
      INSERT INTO products 
        (id, category_id, name, description, 
         price_cents, stock, manufacturer) 
      VALUES (?, ?, ?, ?, ?, ?, ?) 
    `); 

    const products = [ 
      [1, 1, 'Näppäimistö', 'Hiljainen USB-näppäimistö.', 
        4990, 10, 'DemoTech'], 
      [2, 1, 'Hiiri', 'Kevyt langallinen hiiri.', 
        2490, 15, 'DemoTech'], 
      [3, 1, 'Hiirimatto', 'Kankainen hiirimatto.', 
        1290, 20, 'PöytäDemo'], 
      [4, 2, 'Juomapullo', 'Teräksinen 0,5 litran pullo.', 
        1990, 12, 'KotiDemo'], 
      [5, 2, 'Muki', 'Keraaminen kahvimuki.', 
        1290, 18, 'KotiDemo'], 
      [6, 2, 'Pöytävalaisin', 'Säädettävä LED-valaisin.', 
        3490, 8, 'ValoDemo'], 
      [7, 3, 'Reppu', 'Kevyt 20 litran päiväreppu.', 
        3990, 7, 'RetkiDemo'], 
      [8, 3, 'Termospullo', 'Pitää juoman lämpimänä.', 
        2490, 9, 'RetkiDemo'], 
      [9, 3, 'Otsalamppu', 'Paristokäyttöinen otsalamppu.', 
        2990, 6, 'ValoDemo'], 
    ]; 

    for (const product of products) insert.run(...product); 
    db.exec('COMMIT'); 
  } catch (error) { 
    db.exec('ROLLBACK'); 
    throw error; 
  } 
}

// 3. Read functions. 

export function listCategories() { 
  return db.prepare('SELECT * FROM categories ORDER BY id').all(); 
} 

export function listProducts() { 
  return db.prepare('SELECT * FROM products ORDER BY id').all(); 
} 

export function getOrder(id) { 
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id); 
  if (!order) return null; 

  const items = db.prepare(` 
    SELECT product_id, product_name, price_cents, quantity 
    FROM order_items WHERE order_id = ? ORDER BY id 
  `).all(id); 

  return { 
    ...order, 
    invoice_number: `DEMO-${String(order.id).padStart(6, '0')}`, 
    items, 
  }; 
} 

export function listOrders() { 
  return db.prepare('SELECT id FROM orders ORDER BY id DESC') 
    .all().map((order) => getOrder(order.id)); 
} 

function fail(status, message) { 
  const error = new Error(message); 
  error.status = status; 
  throw error; 
} 

// 4. Validate before writing. 
export function createOrder(body) { 
  if (!body || typeof body !== 'object' || Array.isArray(body)) { 
    fail(400, 'Lähetä tilaus JSON-oliona.'); 
  } 

  const name = typeof body.customerName === 'string' 
    ? body.customerName.trim() : ''; 
  const email = typeof body.email === 'string' ? body.email.trim() : ''; 
  if (name.length < 2 || name.length > 100) { 
    fail(400, 'Nimen pituuden tulee olla 2-100 merkkiä.'); 
  } 

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
    fail(400, 'Anna sähköpostiosoite oikeassa muodossa.'); 
  } 

  if (!Array.isArray(body.items) || body.items.length === 0 
      || body.items.length > 50) { 
    fail(400, 'Tilauksessa tulee olla 1-50 tuoteriviä.'); 
  } 

  const seen = new Set(); 

  for (const item of body.items) { 
    if (!item || !Number.isSafeInteger(item.productId) 
        || item.productId < 1 || !Number.isInteger(item.quantity) 
        || item.quantity < 1 || item.quantity > 99) { 
      fail(400, 'Virheellinen tuote tai määrä (sallittu 1-99).'); 
    } 

    if (seen.has(item.productId)) { 
      fail(400, 'Sama tuote saa olla tilauksessa vain kerran.'); 
    } 

    seen.add(item.productId); 
  } 

 

  // 5. Order + items + stock: all or nothing. 
  db.exec('BEGIN IMMEDIATE'); 
  try { 
    const rows = body.items.map((item) => { 
      const product = db.prepare('SELECT * FROM products WHERE id = ?') 
        .get(item.productId); 

      if (!product) fail(400, 'Tilauksessa on tuntematon tuote.'); 

      if (product.stock < item.quantity) { 
        fail(409, `Tuotetta ${product.name} on vain ${product.stock} kpl.`); 
      } 

      return { ...product, quantity: item.quantity }; 
    }); 

    const total = rows.reduce( 
      (sum, row) => sum + row.price_cents * row.quantity, 0, 
    ); 

    if (!Number.isSafeInteger(total)) fail(400, 'Liian suuri summa.'); 

    const created = new Date(); 
    const due = new Date(created); 

    due.setUTCDate(due.getUTCDate() + 14); 

    const result = db.prepare(` 
      INSERT INTO orders 
        (customer_name, email, created_at, due_at, total_cents) 
      VALUES (?, ?, ?, ?, ?) 
    `).run(name, email, created.toISOString(), due.toISOString(), total); 

    const orderId = Number(result.lastInsertRowid); 

    for (const row of rows) { 

      db.prepare(` 
        INSERT INTO order_items 
          (order_id, product_id, product_name, price_cents, quantity) 
        VALUES (?, ?, ?, ?, ?) 
      `).run(orderId, row.id, row.name, row.price_cents, row.quantity); 

      db.prepare(` 
        UPDATE products SET stock = stock - ? WHERE id = ? 
      `).run(row.quantity, row.id); 
    } 

    const order = getOrder(orderId); 
    db.exec('COMMIT'); 
    return order; 

  } catch (error) { 
    db.exec('ROLLBACK'); 
    throw error; 
  } 

}