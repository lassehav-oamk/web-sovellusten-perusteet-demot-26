import React, { useState } from 'react'

export default function StoreMenu({ activeItemName, updateActiveItem }) {
    const itemCssStyle = {
        flexGrow: 1,
        textAlign: 'center',
        cursor: 'pointer'
    }

    const activeItemCssStyle = {
        flexGrow: 1,
        textAlign: 'center',
        backgroundColor: 'lightblue',
        cursor: 'pointer'
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div 
                style={activeItemName == 'Rodents' ? activeItemCssStyle : itemCssStyle}
                onClick={ () => updateActiveItem('Rodents')}
            >Jyrsijät</div>
            <div 
                style={activeItemName == 'Lizards' ? activeItemCssStyle : itemCssStyle}
                onClick={ () => updateActiveItem('Lizards')}
            >Matelijat</div>
            <div 
                style={activeItemName == 'Fish' ? activeItemCssStyle : itemCssStyle}
                onClick={ () => updateActiveItem('Fish')}
            >Kalat</div>
        </div>
    )
}
