import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import { cyan } from '@mui/material/colors';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';
// import emailjs from '@emailjs/browser';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
require("dotenv").config();

export default function AdminDashboardCoins() {

  let [currentAdmin, setCurrentAdmin] = useState({});
  let [rows, setRows] = useState([]);

  let GetAllCoins =  () => {
    useEffect(() => {
      axios.get('http://localhost:3001/coins/getCoinsFromDB')
      .then((response) => {
        let ww = []
        let qq = response.data.map(function(e) {
          return {
            name: e.name,
            id: e.id,
            disabled: e.disabled
          }})
        qq.forEach(e => ww.push(e))
        setRows(ww)
        console.log("DONE FETCH")
      })
      .then(
        axios.get('http://localhost:3001/users/allUsers')
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
          console.log("DONE FETCH")
          onAuthStateChanged(auth, (currentUser) => {
            setCurrentAdmin({
              id: ww.filter(e => e.email === currentUser.email)[0].id,
              email: currentUser.email
            })
          })
        }).catch(e => console.log(e))
      ).catch(e => console.log(e))
    }, [])
  }

  console.log("TEST", currentAdmin)

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

  const changeDisabled = async (id, dis) => {
    await axios.put('http://localhost:3001/coins/modifyCoinDisabled', {
      id: id,
      disabled: !dis
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
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'NAME'
    },
    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: '      ID'
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
  const [orderBy, setOrderBy] = React.useState('name');
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
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // function disabledNotifier( user_email , user_name , dis ) {
  //   emailjs.send( REACT_APP_EMAILJS_SERVICE , REACT_APP_EMAILJS_TEMPLATE_ADMIN_OR_DISABLED , {
  //     user_email: user_email,
  //     user_name: user_name,
  //     crypto_team: "The CripTornado Team",
  //     message: dis ? 'Hello ! We notify you that you are able to use our services again !' : 'Hello. We notify you that your account has been disabled for suspicious activity.'
  //   } , REACT_APP_EMAILJS_PUBLIC_KEY )
  //     .then((response) => {
  //         console.log('SUCCESS!', response.status, response.text);
  //     }, (err) => {
  //         console.log('FAILED...', err);
  //     });
  // }

  GetAllCoins() // CALL FOR FIRST RENDER

  return (
    <Box sx={{ width: '100vw' , backgroundColor: deepPurple[800] }} >
      <Box sx={{ borderBottom: 0 , width: '100vw' , fontSize: 'large', backgroundColor: deepPurple[200] , height: '5vh' }} align="center" >
      </Box>
      <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: deepPurple[800] , padding: '0vw 1vw 0vw'}} >
        <Box  sx={{ display: 'flex' , flexDirection: 'row' , alignItems: 'center' , color: cyan[200] , width: '17vw'  }}>
          <RefreshSharpIcon  fontSize="large" onClick={function() {
            axios.post('http://localhost:3001/coins/postCoinsAPItoDB')
            .then((response) => {
              let ww = []
              let qq = response.data.map(function(e) {
                return {
                  name: e.name,
                  id: e.id,
                  disabled: e.disabled
                }})
              qq.forEach(e => ww.push(e))
              setRows(ww)
              console.log("DONE FETCH")
            }).catch(e => console.log(e))
          }}/>
          <Box sx={{ fontSize: 'large' , color: "white" , padding: '0vw 0.3vw 0vw'}} >
            GET COINS FROM API TO DB
          </Box>
        </Box>
        <Box sx={{ fontSize: 'large' , color: "white" }}>
          ADMIN DASHBOARD  -  COINS
        </Box>
        <Box  sx={{  width: '8vw' }}  >
        </Box>
      </Box>
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
              rowCount={rows.length}
            />
            <TableBody >
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
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
                      sx={{ width: '11vw' }} align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        {row.id}
                      </TableCell>
                      <TableCell sx={{ width: '11vw' }} align="center">
                        <Checkbox /* DISABLED COLUMN */
                          color="primary"
                          checked={row.disabled}
                          onClick={() => changeDisabled(rows[rows.indexOf(row)].id, rows[rows.indexOf(row)].disabled).then(function() {
                            axios.get('http://localhost:3001/coins/getCoinsFromDB')
                            .then((response) => {
                              let ww = []
                              let qq = response.data.map(function(e) {
                                return {
                                  name: e.name,
                                  id: e.id,
                                  disabled: e.disabled
                                }})
                              qq.forEach(e => ww.push(e))
                              setRows(ww)
                              console.log("DONE FETCH")
                              adminChanges(currentAdmin.id, currentAdmin.email, null, null, row.id, row.name, "COIN DISABLED", !row.disabled)
                              /* disabledNotifier( row.email , row.name , !!row.disabled) */
                            }).catch(e => console.log(e))
                          })}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-around' , alignItems: 'center' , height: '7vh' , backgroundColor: deepPurple[100] }} >
        <Box>
          <strong>DISABLED:     </strong><Checkbox color="primary" checked={true}/>=  Coin is disabled     <Checkbox color="primary" checked={false}/>=  Coin is not disabled
        </Box>
      </Box>
      <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-around' , alignItems: 'center' , height: '9vh' , backgroundColor: deepPurple[800]}}>
        <Box sx={{ color: "white" }}>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Shrink Rows"
          />
        </Box>
        <Box sx={{ color: "white" }}>
          Warning ! Every change you made will automatically impact in database !
        </Box>
        <Box sx={{ color: "white" }}>
          ©  2022  CripTornado
        </Box>
      </Box>
    </Box>
  );
}