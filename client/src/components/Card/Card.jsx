import React from 'react'

export default function Card({ id, symbol, image, current_price, market_cap, price_change_percentage_24h, name }) {
  return (
    <div>
        <div>
            <img src={image} alt={id} />
            <h1>{symbol}</h1>
            <h1>{name}</h1>
        </div>
        <div>
            <h3>Market cap: {market_cap}</h3>
            <h3>Current price: ${current_price}</h3>
            <h3>Price change: {price_change_percentage_24h}%</h3>
        </div>
    <br />
    <br />
    <br />
</div>
  )
}
