export async function api(path, options = {}) { 

  const response = await fetch(`/api${path}`, { 
    ...options, 
    headers: { 'Content-Type': 'application/json', ...options.headers }, 
  }); 

  let data; 

  try { 
    data = await response.json(); 
  } catch { 
    throw new Error('Vastaus ei ollut JSONia. Tarkista /api-osoite.'); 
  } 

  if (!response.ok) { 
    throw new Error(data.error || `HTTP-virhe ${response.status}`); 
  } 
  return data; 
} 
 
export function euro(cents) { 
  return new Intl.NumberFormat('fi-FI', { 
    style: 'currency', currency: 'EUR', 
  }).format(cents / 100); 
} 