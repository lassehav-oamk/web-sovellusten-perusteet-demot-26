import React, { useState }from 'react'
import StoreMenu from './components/StoreMenu'
import ProductsFish from './components/ProductsFish'
import ProductsLizards from './components/ProductsLizards'
import ProductsRodents from './components/ProductsRodents'


export default function PetStore() {
    const [activeItemName, setActiveItemName] = useState('Rodents');

    let output;
    switch(activeItemName)
    {
        case "Rodents":
            output = <ProductsRodents />
            break;
        
        case "Lizards":
            output = <ProductsLizards />
            break;
        
        case "Fish":
            output = <ProductsFish />
            break;
    }

    return (
        <div>
            <h1>Hessun lemmikkieläinkauppa</h1>
            <StoreMenu 
                activeItemName={activeItemName} 
                updateActiveItem={ (newActiveItem) => setActiveItemName(newActiveItem) }
            />

            { output }            
        </div>
    )
}
