import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
require("dotenv").config();

const { REACT_APP_EMAILJS_SERVICE , REACT_APP_EMAILJS_TEMPLATE_PASSWORD , REACT_APP_EMAILJS_TEMPLATE_ADMIN_OR_DISABLED , REACT_APP_EMAILJS_PUBLIC_KEY } = process.env;

export default function AdminDashboardUsers() {

  let [arrayForStaticRefresh2, setArrayForStaticRefresh2] = useState([]);

  let [inputUsername, setInputUsername] = useState("");
  let [inputId, setInputId] = useState("");
  let [inputEmail, setInputEmail] = useState("");

  let [inputAdmin, setInputAdmin] = useState("");

  let [currentAdmin, setCurrentAdmin] = useState({});
  let [rows, setRows] = useState([]);
  let [auxiliar, setAuxiliar] = useState([]); // TIENE ID's DEL PRIMER FILTRO (sea USERNAME, ID, o EMAIL)
  let [rowsToShow, setRowsToShow] = useState([]);

  let GetAllUsers = () => { // FIRST TO RENDER WHEN THE COMPONENT LOADS
      useEffect( () => {
      axios.get('http://localhost:3001/users/allUsers')
      .then((response) => {
        let ww = []
        let qq = response.data.map(function(e) {
          return {
            username: e.username,
            id: e.id,
            uid: e.uid,
            password: e.password,
            admin: e.admin,
            disabled: e.disabled,
            email: e.email,
            name: e.name
          }})
        qq.forEach(e => ww.push(e))
        setRows(ww)
        setRowsToShow(ww)
        /* console.log("FIRST TO RENDER WHEN THE COMPONENT LOADS") */
        onAuthStateChanged(auth, (currentUser) => {
          setCurrentAdmin({
             id: ww.filter(e => e.email === currentUser.email)[0].id,
             email: currentUser.email
          })
        })
      }
      ).catch(e => console.log(e))
    }, []);
  }

  function GetActualAllUsers() {
    axios.get('http://localhost:3001/users/allUsers')
    .then((response) => {
      let ww = []
      let qq = response.data.map(function(e) {
        return {
          username: e.username,
          id: e.id,
          uid: e.uid,
          password: e.password,
          admin: e.admin,
          disabled: e.disabled,
          email: e.email,
          name: e.name
        }})
      qq.forEach(e => ww.push(e))
      setRows(ww)
      /* console.log("ACTUALIZACION GENERAL") */
    }).catch(e => console.log(e))
}

  /* console.log("CURRENT ADMIN", currentAdmin) */

  const adminChanges = async (idAdmin, emailAdmin, idUser, emailUser, idCoin, nameCoin,  dataModified, newValue) => {
    await axios.post('http://localhost:3001/users/adminChanges', {
      idAdmin: idAdmin,
      emailAdmin: emailAdmin,
      idUser: idUser,
      emailUser: emailUser,
      idCoin: idCoin,
      nameCoin: nameCoin,
      dataModified: dataModified,
      newValue: newValue
    })
  }

  const changeAdmin = async (id, adm) => {
    await axios.put('http://localhost:3001/users/modifyUserAdmin', {
      id: id,
      admin: !adm
    })
  }

  const changeDisabled = async (id, dis) => {
    await axios.put('http://localhost:3001/users/modifyUserDisabled', {
      id: id,
      disabled: !dis
    })
  }

  const changePassword = async (id, pass) => {
    await axios.put('http://localhost:3001/users/modifyUserPassword', {
      id: id,
      password: pass ? pass : ""
    })
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: 'username',
      numeric: false,
      disablePadding: true,
      label: 'USERNAME'
    },
    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: '      ID'
    },
    {
      id: 'uid',
      numeric: true,
      disablePadding: false,
      label: '      UID'
    },
    {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: '      EMAIL'
    },
    {
      id: 'password',
      numeric: true,
      disablePadding: false,
      label: '      PASSWORD'
    },
    {
      id: 'admin',
      numeric: true,
      disablePadding: true,
      label: '      ADMIN'
    },
    {
      id: 'disabled',
      numeric: true,
      disablePadding: true,
      label: '      DISABLED'
    },
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" >
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'justify'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('username');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsToShow.map((n) => n.username);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, username) => {
    const selectedIndex = selected.indexOf(username);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (username) => selected.indexOf(username) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsToShow.length) : 0;

  function passwordNotifier( user_email , user_name ) {
    emailjs.send( REACT_APP_EMAILJS_SERVICE , REACT_APP_EMAILJS_TEMPLATE_PASSWORD , {
      user_email: user_email,
      user_name: user_name,
      crypto_team: "The Todo x 2 Cripto Team",
      message: 'Hello dear user, your password has been reset.. Please login and set a new password !'
    } , REACT_APP_EMAILJS_PUBLIC_KEY )
      .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
          console.log('FAILED...', err);
      });
  }

  function adminNotifier( user_email , user_name , adm ) {
    emailjs.send( REACT_APP_EMAILJS_SERVICE , REACT_APP_EMAILJS_TEMPLATE_ADMIN_OR_DISABLED , {
      user_email: user_email,
      user_name: user_name,
      crypto_team: "The Todo x 2 Cripto Team",
      message: adm ? 'Hello ! We are grateful to notify you that you are admin now !' : 'Hello.. We notify you that you are not admin anymore..'
    } , REACT_APP_EMAILJS_PUBLIC_KEY )
      .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
          console.log('FAILED...', err);
      });
  }

  function disabledNotifier( user_email , user_name , dis ) {
    emailjs.send( REACT_APP_EMAILJS_SERVICE , REACT_APP_EMAILJS_TEMPLATE_ADMIN_OR_DISABLED , {
      user_email: user_email,
      user_name: user_name,
      crypto_team: "The Todo x 2 Cripto Team",
      message: dis ? 'Hello ! We notify you that you are able to use our services again !' : 'Hello. We notify you that your account has been disabled for suspicious activity.'
    } , REACT_APP_EMAILJS_PUBLIC_KEY )
      .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
          console.log('FAILED...', err);
      });
  }

  GetAllUsers(); // FIRST TO RENDER WHEN THE COMPONENT LOADS

/* 
  console.log("ROWS TO SHOW", rowsToShow)
  console.log("AUXILIAR", auxiliar)
  console.log("INPUT USERNAME", inputUsername)
  console.log("INPUT EMAIL", inputEmail)
  console.log("INPUT ADMIN", inputAdmin)
  console.log("STATIC 2", arrayForStaticRefresh2) */

  return (

    <Box sx={{width: '100vw', marginLeft: "-2.5rem" , marginTop: '-2vh'}}>
      <TextField sx={{ marginLeft: "0.7vw" , marginRight: "0.7vw"}}
        id="outlined-search"
        label="Filter by Username"
        type="search"
        value={inputUsername}
        onChange={(event) => setInputUsername(event.target.value) + setRowsToShow(rows.filter(e => e.username.includes(event.target.value))) + setAuxiliar(rows.filter(e => e.username.includes(event.target.value))) }
        onClick={inputUsername === "" ? () => setInputId("") + setInputEmail("") + setInputAdmin("") + GetActualAllUsers() + setRowsToShow(rows) : null}
      />
       <TextField sx={{ marginLeft: "0.7vw" , marginRight: "0.7vw"}}
        id="outlined-search"
        label="Filter by Id"
        type="search"
        value={inputId}
        onChange={(event) => setInputId(event.target.value) + GetActualAllUsers() + setRowsToShow(rows.filter(e => e.id.includes(event.target.value))) + setAuxiliar(rows.filter(e => e.id.includes(event.target.value))) }
        onClick={inputId === "" ? () => setInputUsername("") + setInputEmail("") + setInputAdmin("") + GetActualAllUsers() + setRowsToShow(rows) : null}
      />
      <TextField sx={{ marginLeft: "0.7vw" , marginRight: "0.7vw"}}
        id="outlined-search"
        label="Filter by Email"
        type="search"
        value={inputEmail}
        onChange={(event) => setInputEmail(event.target.value) + setRowsToShow(rows.filter(e => e.email.includes(event.target.value))) + setAuxiliar(rows.filter(e => e.email.includes(event.target.value))) }


        onClick={inputEmail === "" ? () => setInputUsername("") + setInputId("") + setInputAdmin("") + GetActualAllUsers() + setRowsToShow(rows) : null}
      />
      <Box sx={{ marginTop: '1.5vh', marginBottom: '1.5vh' }} >
        <FormControl disabled={(inputUsername === "" && inputId === "" && inputEmail === "") ? true : false}>
          <InputLabel id="demo-simple-select-label">is Admin ?</InputLabel>
          <Select
            sx={{ width: '15vw' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputAdmin}
            label="isAdmin"
            onChange={(event) => // IS ADMIN SELECTED

              setInputAdmin(event.target.value)
              + axios.get('http://localhost:3001/users/allUsers')
              .then((response) => {
                let ww = []
                let qq = response.data.map(function(e) {
                  return {
                    username: e.username,
                    id: e.id,
                    password: e.password,
                    admin: e.admin,
                    disabled: e.disabled,
                    email: e.email,
                    name: e.name
                  }})
                qq.forEach(e => ww.push(e))
                setRows(ww)

                if(inputUsername !== "" &&  (event.target.value === true || event.target.value === false)) setRowsToShow(ww.filter(e => e.username.includes(inputUsername) && e.admin === event.target.value))
                if(inputUsername !== "" &&  event.target.value === "") setRowsToShow(ww.filter(e => e.username.includes(inputUsername)))

                if(inputId !== "" &&  (event.target.value === true || event.target.value === false)) setRowsToShow(ww.filter(e => e.id.includes(inputId) && e.admin === event.target.value))
                if(inputId !== "" &&  event.target.value === "") setRowsToShow(ww.filter(e => e.id.includes(inputId)))

                if(inputEmail !== "" &&  (event.target.value === true || event.target.value === false)) setRowsToShow(ww.filter(e => e.email.includes(inputEmail) && e.admin === event.target.value))
                if(inputEmail !== "" &&  event.target.value === "") setRowsToShow(ww.filter(e => e.email.includes(inputEmail)))



                /* console.log("DONE FETCH DEL ADMIN SELECT") */
              })

            }
          >

            <MenuItem value={true}>Is Admin</MenuItem>
            <MenuItem value={false}>Is not Admin</MenuItem>
          </Select>
          {inputAdmin === "" ? null
          :
          <CloseSharpIcon
          sx={{ position: 'absolute', width: '3vw', height: '3vh' , marginTop: '1.5vh'}}
          onClick={() =>
            axios.get('http://localhost:3001/users/allUsers')
            .then((response) => {
              let arrayForStaticRefresh = []
              let ww = []
              let qq = response.data.map(function(e) {
                return {
                  username: e.username,
                  id: e.id,
                  password: e.password,
                  admin: e.admin,
                  disabled: e.disabled,
                  email: e.email,
                  name: e.name
                }})
              qq.forEach(e => ww.push(e))
              setRows(ww)
              auxiliar.forEach(el => arrayForStaticRefresh.push((ww.filter(e => el.id === e.id))[0]))
              setRowsToShow(arrayForStaticRefresh)
              /* console.log("DONE FETCHHHHHHHHHHHHHHHHHHHHHHHHHHHHH") */
            }).then(setInputAdmin("")).catch(e => console.log(e))
          }
          />
          }
        </FormControl>

      </Box>

      <Box sx={{ borderBottom: 0 , width: '100vw' , fontSize: 'large', backgroundColor: deepPurple[200] , height: '1vh'}} align="center" >
      </Box>
      <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '3vh' , backgroundColor: deepPurple[800] , padding: '0vw 1vw 0vw'}} >
        
        
      </Box>
      <Box sx={{ width: '100vw' , backgroundColor: deepPurple[800] }} >
        <Paper sx={{ width: '100vw', mb: 2 }} >
            <TableContainer >
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rowsToShow.length}
                />
                <TableBody >
                  {stableSort(rowsToShow, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell padding="checkbox" >
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.username}
                          </TableCell>
                          <TableCell sx={{ width: '30vw' }} align="center">
                            {row.id}
                          </TableCell>
                          <TableCell sx={{ width: '30vw' }} align="center">
                            {row.uid}
                          </TableCell>
                          <TableCell sx={{ width: '30vw' }} align="center">
                            {row.email}
                          </TableCell>
                          <TableCell sx={{ width: '15vw' }} align="center">
                            <Checkbox /* PASSWORD COLUMN */
                              color="primary"
                              checked={!!row.password}
                              onClick={!!row.password ? () => + changePassword(rowsToShow[rowsToShow.indexOf(row)].id).then(async function() {
                                await axios.get('http://localhost:3001/users/allUsers')
                                .then((response) => {
                                  let ww = []
                                  let qq = response.data.map(function(e) {
                                    return {
                                      username: e.username,
                                      id: e.id,
                                      uid: e.uid,
                                      password: e.password,
                                      admin: e.admin,
                                      disabled: e.disabled,
                                      email: e.email,
                                      name: e.name
                                    }})
                                  qq.forEach(e => ww.push(e))
                                  setRows(ww)
                                  /* console.log("DONE FETCH") */
                                  passwordNotifier( row.email , row.name )
                                }).catch(e => console.log(e))
                              }) : null}
                            />
                          </TableCell>
                          <TableCell sx={{ width: '11vw' }} align="center">
                            <Checkbox /* ADMIN COLUMN */
                              color="primary"
                              checked={row.admin}

                                  /* adminChanges(currentAdmin.id, currentAdmin.email, row.id, row.email, null, null, "USER ADMIN", !row.admin) */
                                   /* + adminNotifier( row.email , row.name , !row.admin) */

                                  onClick={ () =>
                                    (changeAdmin(row.id, row.admin))
                                    /* .then(() => console.log("ADMINN", row.admin)) */
                                    .then(() => axios.get('http://localhost:3001/users/allUsers')
                                    .then((response) => {

                                      let ww = []
                                      let qq = response.data.map(function(e) {
                                        return {
                                          username: e.username,
                                          id: e.id,
                                          password: e.password,
                                          admin: e.admin,
                                          disabled: e.disabled,
                                          email: e.email,
                                          name: e.name
                                        }})
                                      qq.forEach(e => ww.push(e))
                                      setRows(ww)
                                      if(inputUsername === "" &&  inputId === "" &&  inputEmail === "" && inputAdmin === "") setRowsToShow(ww)

                                      if(inputUsername !== "" &&  (inputAdmin === true || inputAdmin === false)) setRowsToShow(ww.filter(e => e.username.includes(inputUsername) && e.admin ===  inputAdmin))
                                      if(inputUsername !== "" &&  inputAdmin === "") setRowsToShow(ww.filter(e => e.username.includes(inputUsername)))

                                      if(inputId !== "" &&  (inputAdmin === true || inputAdmin === false)) setRowsToShow(ww.filter(e => e.id.includes(inputId) && e.admin ===  inputAdmin))
                                      if(inputId !== "" &&  inputAdmin === "") setRowsToShow(ww.filter(e => e.id.includes(inputId)))

                                      if(inputEmail !== "" &&  (inputAdmin === true || inputAdmin === false)) setRowsToShow(ww.filter(e => e.email.includes(inputEmail) && e.admin === inputAdmin))
                                      if(inputEmail !== "" &&  inputAdmin === "") setRowsToShow(ww.filter(e => e.email.includes(inputEmail)))



                                      /* console.log("DONE FETCH DEL CHECKBOX ADMIN") */
                                    }))
                                  }


                            />
                          </TableCell>
                          <TableCell sx={{ width: '11vw' }} align="center">
                            <Checkbox /* DISABLED COLUMN */
                              color="primary"
                              checked={row.disabled}
                              onClick={() => changeDisabled(rows[rows.indexOf(row)].id, rows[rows.indexOf(row)].disabled).then(async function() {
                                await axios.get('http://localhost:3001/users/allUsers')
                                .then(async (response) => {
                                  let arrayForStaticRefresh = []
                                  let ww = []
                                  let qq = await response.data.map(function(e) {
                                    return {
                                      username: e.username,
                                      id: e.id,
                                      uid: e.uid,
                                      password: e.password,
                                      admin: e.admin,
                                      disabled: e.disabled,
                                      email: e.email,
                                      name: e.name
                                    }})
                                  qq.forEach(e => ww.push(e))
                                  setRows(ww)
                                  rowsToShow.forEach(el => arrayForStaticRefresh.push((ww.filter(e => el.id === e.id))[0]))
                                  arrayForStaticRefresh = arrayForStaticRefresh2
                                  setRows(arrayForStaticRefresh)
                                  setRowsToShow(arrayForStaticRefresh)
                                 /*  console.log("DONE FETCH") */
                                  adminChanges(currentAdmin.id, currentAdmin.email, row.id, row.email, null, null, "USER DISABLED", !row.disabled)
                                  disabledNotifier( row.email , row.name , !!row.disabled)
                                }).catch(e => console.log(e))
                              })}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows}}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={rowsToShow.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
      </Box>
      
      <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-around' , alignItems: 'center' , height: '9vh' , backgroundColor: deepPurple[800]}}>
        <Box sx={{ color: "white" }}>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Shrink Rows"
          />
        </Box>
        <Box sx={{ color: "white" }} >
          Warning ! Every change you made will automatically impact in database & send an email to user !
        </Box>
        <Box sx={{ color: "white" }} >
          ©  2022  Todo x 2 Cripto
        </Box>
      </Box>
    </Box>
  );
}