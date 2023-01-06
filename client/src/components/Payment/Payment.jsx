import React, { useState } from "react";
import axios from 'axios';
import { Box , TableRow , TableCell , Button , Checkbox } from '@mui/material';
import { grey , yellow } from '@mui/material/colors';

export default function Payment() {

  let [first, setFirst] = useState(false);
  let [second, setSecond] = useState(false);

  function nationalityChecker(nat) {
    if (nat === "Australia") return {short: "au", long: "AUS"}
    if (nat === "Costa Rica") return {short: "cr", long: "CRI"}
  }

  let product = [
    {
      title: 'bitcoin',
      shortTitle: 'BTC',
      image: 'https://random.dog/1400de7f-00a2-4ddd-b40f-1c9040105401.JPG',
      description: 'bitcoin description, unused in MP',
      amount: 0.00000023.toFixed(10), // CANTIDAD DE DECIMALES, VALOR FIJO
      price: 10.50.toFixed(2),
      nationality: "Australia"
    },
    {
      title: 'ethereum',
      shortTitle: 'ETH',
      image: 'https://random.dog/af625dd3-212d-421e-ab31-5439d150fa9a.jpg',
      description: 'ethereum description, unused in MP',
      amount: 0.00000044.toFixed(10), // CANTIDAD DE DECIMALES, VALOR FIJO
      price: 7.20.toFixed(2),
      nationality: "Costa Rica"
    }

  ]
  return (
    <Box >

      <TableRow sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: grey[100] , padding: '0vw 1vw 0vw'}}>
        <TableCell>PRODUCT</TableCell>
        <TableCell>REGION</TableCell>
        <TableCell>PRICE / UNIT</TableCell>
      </TableRow>
      {product.map((e) => (
        <TableRow sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: grey[100] , padding: '0vw 1vw 0vw'}}>
          <TableCell>
            <Box sx={{ width: '5vh' , height: '3vh'}}
              component="img"
              alt="The house from the offer."
              src={e.image}
            />
            {e.shortTitle.toUpperCase() + " " + e.amount}
            </TableCell>
          <TableCell sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '5vh' , backgroundColor: grey[100] , padding: '0vw 1vw 0vw'}}>
            <Box sx={{ width: '5vh' , height: '3vh'}}
              component="img"
              alt="The house from the offer."
              src={`https://flagcdn.com/w640/${nationalityChecker(e.nationality).short}.png`}
            />
                {nationalityChecker(e.nationality).long}
          </TableCell>
          <TableCell>ARS    {e.price}</TableCell>
        </TableRow>
      ))}
      <TableRow sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: grey[100] , padding: '0vw 1vw 0vw'}}>
      <TableCell /* sx={{ width: '15vw' }} align="center" */>
          <Checkbox
            color="primary"
            checked={first}
            onClick={() => setFirst(!first)}
          />
          I HAVE ACKNOWLEDGED THAT MY RIGHT OF WITHDRAWAL EXPIRES WHEN THE CONTRACT IS EXECUTED
        </TableCell>
        <TableCell>CHARGES</TableCell>
        <TableCell>ARS    {(product.map(e => parseFloat(e.price)).reduce((pv, cv) => pv + cv, 0) / 10).toFixed(2)}</TableCell>
      </TableRow>
      <TableRow sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: grey[100] , padding: '0vw 1vw 0vw'}}>
        <TableCell /* sx={{ width: '15vw' }} align="center" */>
          <Checkbox
            color="primary"
            checked={second}
            onClick={() => setSecond(!second)}
          />
          I AGREE WITH TERMS
        </TableCell>
        <TableCell>TOTAL</TableCell>
        <TableCell>ARS    {(product.map(e => parseFloat(e.price)).reduce((pv, cv) => pv + cv, 0) + (product.map(e => parseFloat(e.price)).reduce((pv, cv) => pv + cv, 0) / 10)).toFixed(2)}</TableCell>
      </TableRow>
      <Button variant="contained"
        disabled={!!first && !!second ? false : true}
        sx={{ backgroundColor: yellow[500] , color: grey[900] , width: '12vw'}}
        onClick={() => {
          axios.post('http://localhost:3001/users/payment', product)
          .then((res) => window.location.href = res.data.response.body.init_point)
      }}
      >
        BUY CRIPTO
      </Button>
    </Box>
  );
}