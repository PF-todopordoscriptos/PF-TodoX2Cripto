import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../redux/actions";
import Card from "../Card/Card";

export default function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCoins())
  }, [])

  const allCoins = useSelector((state) => state.allCoins)
  console.log(allCoins)

  return (
    <div>
        {allCoins && 
        allCoins.map((c) => {
          return <Card
                  id= {c.id}
                  name= {c.name}
                  symbol= {c.symbol}
                  current_price= {c.current_price}
                  image= {c.image}
                  market_cap= {c.market_cap}
                  price_change_percentage_24h= {c.price_change_percentage_24h}
                  />
        })
        }
    </div>
  )
}

