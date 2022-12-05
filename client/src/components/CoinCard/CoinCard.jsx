import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../redux/actions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Link } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

//id, symbol, image, current_price, market_cap, price_change_percentage_24h, name
export default function CoinCard(props) {
  let dispatch = useDispatch();
  let favoriteCoins = useSelector((state) => state.favoriteCoins);

  const [favoriteClicked, setFavoriteClicked] = useState(false);

  const toggleFavoriteClick = () => {
    setFavoriteClicked(!favoriteClicked);
  };

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

  // function conditionalColour() {
  //   if (props.price_change_percentage_24h < 0) return "green";
  //   else {
  //     return "red";
  //   }
  // }

  return (
    <List sx={{ width: "100%" }}>
      <ListItem sx={{ bgcolor: "#3B2A43", borderRadius: "50px" }}>
        <Link href={`/details/${props.id}`} underline="none">
          <CardMedia
            component="img"
            sx={{ width: 50, marginX: 3 }}
            image={props.image}
            alt={props.id}
          />
        </Link>
        <Link href={`/details/${props.id}`} underline="none">
          <Typography color={"white"} gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
        </Link>
        <Link href={`/details/${props.id}`} underline="none">
          <Typography
            color={"white"}
            sx={{ marginX: 3 }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {props.symbol}
          </Typography>
        </Link>

        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Details" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Typography sx={{ marginX: 3 }} variant="h6" color="white">
              Market cap: {props.market_cap}
            </Typography>
            <Typography
              sx={{ marginX: 3 }}
              variant="h6"
              // color={conditionalColour()}
            >
              {props.price_change_percentage_24h}
            </Typography>
          </List>
        </Collapse>

        <Typography variant="h6" color="white">
          Current price: ${props.current_price}
        </Typography>
        <CardActions>
          <Button size="large" color="primary">
            Comprar
          </Button>

          {favoriteClicked ? (
            <IconButton aria-label="" onClick={toggleFavoriteClick}>
              <StarOutlinedIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton aria-label="" onClick={toggleFavoriteClick}>
              <StarOutlineOutlinedIcon color="primary" />
            </IconButton>
          )}

          <Button onClick={Favorite} size="large" color="primary">
            FAVORITOS
          </Button>
        </CardActions>
      </ListItem>
    </List>
  );
}
