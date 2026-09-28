import { useEffect, useState } from 'react';
import './Recipes.css';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipes() {
      try {
        const response = await fetch('https://dummyjson.com/recipes', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP-virhe: ${response.status}`);
        }

        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Reseptien lataaminen epäonnistui.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => controller.abort();
  }, []);

  return (
    <main className="recipes-page">
      <h1>Reseptit</h1>

      {loading && <p>Ladataan reseptejä...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <ul className="recipes-list">
          {recipes.map((recipe) => (
            <li className="recipe-card" key={recipe.id}>
              <img src={recipe.image} alt={recipe.name} loading="lazy" />
              <div>
                <h2>{recipe.name}</h2>
                <p>{recipe.cuisine} · {recipe.difficulty}</p>
                <p>Valmistusaika: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
