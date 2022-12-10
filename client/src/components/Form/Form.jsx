import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Button, Container, TextField } from "@mui/material";
import { postUser } from "../../redux/actions/index.js"

const Form = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        username: '',
        password: '',
        name: '',
        lastname: '',
        email: '',
        telephone: '',
        dni: '',
        nationality: ''
      })

    const onValueChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitedForm = (e) => {
        e.preventDefault();
        // if(!input.username || !input.password || !input.name || !input.lastname || !input.email || !input.telephone || !input.dni || !input.nationality) {
        //     return alert ('Complete correctamente el formulario antes de enviarlo')
        //   }
        dispatch(postUser(input));
        setInput({
            email: '',
            password: '',
            //username: '',
            //name: '',
            //lastname: '',
            //telephone: '',
            //dni: '',
            //nationality: ''
          })
        console.log(input);
    
    }

  return(
    <Container
      direction="column"
      component="form"
      noValidate
      autoComplete="off"
      m={2}
      sx={{
        width: '600px',
        height: "300px",
        justifyContent: 'center',
        alignItems: 'center'
      }}
     >
      {/* <TextField 
        required
        error
        id="outlined-basic" 
        label="Username"
        variant="outlined"
        name='username'
        value={input.username}
        onChange={onValueChange}
        sx={{
          marginTop: '20px',
          width: '90%',
        }}
      /> */}

      <TextField 
        required
        error
        id="outlined-basic" 
        label="Email"
        variant="outlined"
        name='email'
        value={input.email}
        onChange={onValueChange}
        sx={{
          marginTop: '20px',
          width: '90%',
        }}
      />

      <TextField 
        required
        error
        id="outlined-basic" 
        label="Password" 
        variant="outlined"
        name='password'
        value={input.password}
        onChange={onValueChange}
        sx={{
          marginTop: '23px',
          width: '90%',
        }}
      />


      {/* <TextField 
        required
        error
        id="outlined-basic" 
        label="Name" 
        variant="outlined"
        name='name'
        value={input.name}
        onChange={onValueChange}
        sx={{
          marginTop: '23px',
          width: '90%',
        }}
      />

      <TextField 
        required
        error
        id="outlined-basic" 
        label="Last Name"
        variant="outlined"
        name='lastname'
        value={input.lastname}
        onChange={onValueChange}
        sx={{
          marginTop: '20px',
          width: '90%',
        }}
      />

      <TextField 
        required
        error
        id="outlined-basic" 
        label="DNI" 
        variant="outlined"
        name='dni'
        value={input.dni}
        onChange={onValueChange}
        sx={{
          marginTop: '23px',
          width: '90%',
        }}
      />

      <TextField 
        required
        error
        id="outlined-basic" 
        label="Telephone"
        variant="outlined"
        name='telephone'
        value={input.telephone}
        onChange={onValueChange}
        sx={{
          marginTop: '20px',
          width: '90%',
        }}
      />

      <TextField 
        required
        error
        id="outlined-basic" 
        label="Nationality" 
        variant="outlined"
        name='nationality'
        value={input.nationality}
        onChange={onValueChange}
        sx={{
          marginTop: '23px',
          width: '90%',
        }}
      /> */}
      <Button 
        //disabled
        variant="outlined" 
        onClick={onSubmitedForm}
        sx={{
          margin: "15px"
        }}
        >
        Register
      </Button>
    </Container>
  ) 
};

export default Form;