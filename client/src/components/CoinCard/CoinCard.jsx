import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { addFavorite } from "../../redux/actions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";

//id, symbol, image, current_price, market_cap, price_change_percentage_24h, name
export default function CoinCard(props) {

  let dispatch = useDispatch()
  let favoriteCoins = useSelector((state) => state.favoriteCoins)

  const Favorite = () => {
    if(!favoriteCoins.find(c => c.name === props.name)){
      dispatch(addFavorite({
        id:props.id,
        key:props.id,
        image:props.image,
        name:props.name,
        symbol:props.symbol,
        market_cap:props.market_cap,
        price_change_percentage_24h:props.price_change_percentage_24h,
        current_price:props.current_price,
      }))
    }
  }

  return (
    <Card sx={{ maxWidth: 415, borderRadius: 3, boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="340px"
        width="415px"
        image={props.image}
        alt={props.id}
      />

      <CardContent>
        <Typography gutterBottom variant="h1" component="div">
          {props.name}
        </Typography>
        <Typography gutterBottom variant="h1" component="div">
          {props.symbol}
        </Typography>
        <Typography variant="h3" color="text.secondary">
          Market cap: {props.market_cap}
        </Typography>
        <Typography variant="h3" color="text.secondary">
          Price change: {props.price_change_percentage_24h}%
        </Typography>
        <Typography variant="h3" color="text.secondary">
          Current price: ${props.current_price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" color="primary">
          Comprar
        </Button>
        <Button onClick={Favorite} size="large" color="primary">
          FAVORITOS
        </Button>
      </CardActions>
    </Card>
  );
}

//     <div>
//         <div>
//             <img src={image} alt={id} />
//             <h1>{symbol}</h1>
//             <h1>{name}</h1>
//         </div>
//         <div>
//             <h3>Market cap: {market_cap}</h3>
//             <h3>Current price: ${current_price}</h3>
//             <h3>Price change: {price_change_percentage_24h}%</h3>
//         </div>
//     <br />
//     <br />
//     <br />
// </div>