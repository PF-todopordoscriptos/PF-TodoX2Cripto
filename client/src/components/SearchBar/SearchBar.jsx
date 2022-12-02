import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Stack, TextField } from '@mui/material';

import * as actions from '../../redux/actions'


const SearchBar = ()=> {
    const dispatch = useDispatch();
    const [coin, setCoin] = useState('');
        
    const handleChange = (e) => {
        e.preventDefault();
        setCoin(e.target.value);
        console.log('e.target.value '+coin);
    }

    React.useEffect(() => { 
        dispatch(actions.getCoinByName(coin))
      }, [coin, dispatch] )

  return (
    <Stack
     direction='row'
     sx={{
        marginTop: '30px',
        width: '80%'
     }}
    >
    <TextField
     id="outlined-basic"
     label="Buscar"
     placeholder="Bitcoin"
     variant="outlined"
     size='small'
     value={coin}
     onChange={handleChange}
     sz={{
        width: '90%',
     }}
    />
    </Stack>   
  )
}

export default SearchBar
