export default function Home({ categories, onSelectCategory }) { 

  return ( 
    <section> 
      <h1>Tervetuloa demokauppaan</h1> 
      <p>Valitse kategoria, tutustu tuotteisiin ja tee kokeilutilaus.</p> 
      <div className="grid"> 
        {categories.map((category) => ( 
          <button key={category.id} className="card" 
            onClick={() => onSelectCategory(category.id)}> 
            {category.name} 
          </button> 
        ))} 
      </div> 
    </section> 
  ); 
} 