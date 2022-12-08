import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectNat = ({value, onChange}) => {

    // const [input,setInput] = useState({
    //     email: "",
    //     name: "",
    //     password: "",
    //     repeatPassword: "",
    //     username: "",
    //     lastname: "",
    //     telephone: "",
    //     dni: 0,
    //     nationality: "",
    //     showPassword: false,
    //     showRepeatPassword: false,
    // })

    // const handleInput = (e) => {
    //     setInput({
    //         ...input,
    //         [e.target.name] : e.target.value
    //     })
    //     console.log(input)
    // }

    const paises = ["Antarctica", "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Denmark", "Dominican Republic", "Ecuador", "Finland", "France", "Germany", "Greece", "Guatemala", "Hong Kong", "India", "Italy", "Japan", "Korea", "Mexico", "Netherlands"]

  return (
    <div>
         <FormControl variant="standard" sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">
         Nationality
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name= "nationality"
          value={value}
          onChange={onChange}
        >

          { paises.map((p => {
            return <MenuItem value={p}>{p}</MenuItem>
          }))}

        </Select>
      </FormControl>
    </div>
  )
}

export default SelectNat