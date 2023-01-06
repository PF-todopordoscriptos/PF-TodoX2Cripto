import React from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';


import { grey } from '@mui/material/colors';
import { CardMedia } from '@mui/material';

export default function Payment() {

  function nationalityChecker(nat) {
    if (nat === "Australia") return {short: "au", long: "AUS"}
    if (nat === "Costa Rica") return {short: "cr", long: "CRI"}
  }

  let items = [
    {
      title: 'bitcoin',
      image: 'https://random.dog/1400de7f-00a2-4ddd-b40f-1c9040105401.JPG',
      description: 'bitcoin description, unused in MP',
      amount: 0.00000023.toFixed(10), // CANTIDAD DE DECIMALES, VALOR FIJO
      price: 10.00.toFixed(2),
      nationality: "Australia"
    },
    {
      title: 'ethereum',
      image: 'https://random.dog/af625dd3-212d-421e-ab31-5439d150fa9a.jpg',
      description: 'ethereum description, unused in MP',
      amount: 0.00000044.toFixed(10), // CANTIDAD DE DECIMALES, VALOR FIJO
      price: 7.00.toFixed(2),
      nationality: "Costa Rica"
    }

  ]
  return (
    <Box >

      <TableRow sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: grey[100] , padding: '0vw 1vw 0vw'}}>
        <TableCell>PRODUCT</TableCell>
        <TableCell>REGION</TableCell>
        <TableCell>PRICE/UNIT</TableCell>
      </TableRow>
      {items.map((e) => (
        <TableRow sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: grey[100] , padding: '0vw 1vw 0vw'}}>
          <TableCell>{e.title.toUpperCase()}</TableCell>
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
        <TableCell> </TableCell>
        <TableCell>CHARGES</TableCell>
        <TableCell>ARS    {(items.map(e => parseFloat(e.price)).reduce((pv, cv) => pv + cv, 0) / 10).toFixed(2)}</TableCell>
      </TableRow>
      <TableRow sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: grey[100] , padding: '0vw 1vw 0vw'}}>
        <TableCell> </TableCell>
        <TableCell>TOTAL</TableCell>
        <TableCell>{(items.map(e => parseFloat(e.price)).reduce((pv, cv) => pv + cv, 0) + (items.map(e => parseFloat(e.price)).reduce((pv, cv) => pv + cv, 0) / 10)).toFixed(2)}</TableCell>
      </TableRow>

    </Box>

  );
}