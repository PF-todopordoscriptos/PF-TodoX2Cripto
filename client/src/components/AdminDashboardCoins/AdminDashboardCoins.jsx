// EDITANDO, NO FUNCIONAL !
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
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import { cyan } from '@mui/material/colors';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';
import emailjs from '@emailjs/browser';
require("dotenv").config();

const { 
  REACT_APP_EMAILJS_SERVICE, 
  REACT_APP_EMAILJS_TEMPLATE_PASSWORD,
  REACT_APP_EMAILJS_TEMPLATE_ADMIN_OR_DISABLED,
  REACT_APP_EMAILJS_PUBLIC_KEY 
} = process.env;

export default function AdminDashboardCoins() {

  let [rows, setRows] = useState([]);

  let GetAllUsers =  () => {
    useEffect(() => {
      axios.get('http://localhost:3001/coins/loadCoinsInDb')
      .then((response) => {
        let ww = []
        let qq = response.data.map(function(e) {
          return {
            name: e.name,
            id: e.id,
            password: e.password,
            admin: e.admin,
            disabled: e.disabled,
            email: e.email,
            name: e.name
          }})
        qq.forEach(e => ww.push(e))
        setRows(ww)
        console.log("DONE FETCH")
      }).catch(e => console.log(e))
    }, []);
  }  

  const changeDisabled = async (id, dis) => {
    await axios.put('http://localhost:3001/users/modifyCoinDisabled', { 
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

  GetAllUsers() // CALL FOR FIRST RENDER
      
  return (
    <Box sx={{ width: '100%' , backgroundColor: deepPurple[800] }} >
      <Box>
        <TableCell sx={{ borderBottom: 0 , width: '1%' , fontSize: 'large', backgroundColor: deepPurple[200]}} align="center">
           
        </TableCell>
      </Box>
      <Table sx={{ borderBottom: 1}}>
        <TableRow >
          <TableCell sx={{ width: '1%' , fontSize: 'large' , padding: '1% 10% 1% 0.5%'}} align="center">
            <IconButton style={{ color: cyan[200] , borderBottom: 0 }}>
              <RefreshSharpIcon  fontSize="large" onClick={function() {
                axios.get('http://localhost:3001/coins/loadCoinsInDb')
                .then((response) => {
                  let ww = []
                  let qq = response.data.map(function(e) {
                    return {
                      name: e.name,
                      id: e.id,
                      password: e.password,
                      admin: e.admin,
                      disabled: e.disabled,
                      email: e.email,
                      name: e.name
                    }})
                  qq.forEach(e => ww.push(e))
                  setRows(ww)
                  console.log("DONE FETCH")
                }).catch(e => console.log(e))
              }}/>
            </IconButton>
             </TableCell>
            <TableCell sx={{ fontSize: 'large' , padding: '0.3% 0% 0px 0.4%' , height: '3px' , color: "white" }} >
              REFRESH           
            </TableCell>      
            <TableCell sx={{ width: '55%' , fontSize: 'large' , color: "white"}}>
              ADMIN DASHBOARD  -  COINS
            </TableCell>
        </TableRow>  
      </Table>      
      <Paper sx={{ width: '100%', mb: 2 }} >
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
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" >
                      </TableCell>
                      <TableCell
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
                      <TableCell align="center"> 
                        <Checkbox /* DISABLED COLUMN */
                          color="primary"
                          checked={row.disabled}
                          onClick={() => changeDisabled(rows[rows.indexOf(row)].id, rows[rows.indexOf(row)].disabled).then(function() {
                            axios.get('http://localhost:3001/coins/loadCoinsInDb')
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
      <Table>
        <TableRow sx={{ borderBottom: 0 , width: '1%', fontSize: 'large' , backgroundColor: deepPurple[100] }} >
          <TableCell align='center'>
            <strong>DISABLED:     </strong><Checkbox color="primary" checked={true}/>=  Coin is disabled     <Checkbox color="primary" checked={false}/>=  Coin is not disabled
          </TableCell>
        </TableRow>
      </Table>
      <Table>
        <TableRow /* sx={{ borderBottom: 0}} */ >
          <TableCell sx={{ borderBottom: 1 , width: '0%' }}></TableCell>
          <TableCell sx={{ borderBottom: 1 , width: '10%' }}>
            <FormControlLabel  
              sx={{ color: "white" , borderBottom: 0 }}
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Shrink Rows"              
            />
          </TableCell>            
          <TableCell sx={{ borderBottom: 0 , align: "left", width: '55%', fontSize: 'large' , color: "white" }} align='center'>
            Warning ! Every change you made will automatically impact in database !
          </TableCell>
          <TableCell sx={{ borderBottom: 0 , align: "left", width: '12%', fontSize: 'large' , color: "white" }}>
            ©  2022  CripTornado
          </TableCell>          
        </TableRow>
      </Table>
    </Box>
  );
}