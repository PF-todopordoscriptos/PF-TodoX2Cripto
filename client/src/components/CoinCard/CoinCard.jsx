import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../redux/actions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Link } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Collapse from "@mui/material/Collapse";

//id, symbol, image, current_price, market_cap, price_change_percentage_24h, name
export default function CoinCard(props) {
  let dispatch = useDispatch();
  let favoriteCoins = useSelector((state) => state.favoriteCoins);

  const Favorite = () => {
    if (!favoriteCoins.find((c) => c.name === props.name)) {
      dispatch(
        addFavorite({
          id: props.id,
          key: props.id,
          image: props.image,
          name: props.name,
          symbol: props.symbol,
          market_cap: props.market_cap,
          price_change_percentage_24h: props.price_change_percentage_24h,
          current_price: props.current_price,
        })
      );
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    // <Card sx={{ maxWidth: 415, borderRadius: 3, boxShadow: 4 }}>
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem>
        <Link href={`/details/${props.id}`} underline="none">
          <CardMedia
            component="img"
            sx={{ width: 50 }}
            image={props.image}
            alt={props.id}
          />
        </Link>
        <Link href={`/details/${props.id}`} underline="none">
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
        </Link>
        <Link href={`/details/${props.id}`} underline="none">
          <Typography gutterBottom variant="h6" component="div">
            {props.symbol}
          </Typography>
        </Link>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>

          <ListItemText primary="Details" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Typography variant="h6" color="text.secondary">
              Market cap: {props.market_cap}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Price change: {props.price_change_percentage_24h}%
            </Typography>
          </List>
        </Collapse>

        <Typography variant="h6" color="text.secondary">
          Current price: ${props.current_price}
        </Typography>
        <CardActions>
          <Button size="large" color="primary">
            Comprar
          </Button>
          <Button onClick={Favorite} size="large" color="primary">
            FAVORITOS
          </Button>
        </CardActions>
      </ListItem>
    </List>
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
