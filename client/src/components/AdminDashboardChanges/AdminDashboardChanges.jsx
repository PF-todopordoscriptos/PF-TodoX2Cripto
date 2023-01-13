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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import { cyan } from '@mui/material/colors';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';

export default function AdminDashboardChanges() {
  //const backendUrl = "http://localhost:3001"
  const backendUrl = "https://todox2cripto-backend.onrender.com"
  
  let [rows, setRows] = useState([]);

  let GetAllChanges =  () => {
    useEffect(() => {
      axios.get(`${backendUrl}/users/allAdminChanges`)
      .then((response) => {
        let ww = []
        let qq = response.data.map(function(e) {
          var utcDate = e.createdAt;
          var localDate = new Date(utcDate);
          return {
            id: e.id,
            idAdmin: e.idAdmin,
            emailAdmin: e.emailAdmin,
            target: e.emailUser ? e.emailUser : e.nameCoin,
            dataModified: e.dataModified,
            newValue: e.newValue,
            createdAt: localDate.toLocaleDateString('es-ES').split("/").reverse().join("/") + " " + localDate.toLocaleDateString('es-ES', {weekday: 'long'}) + "" + localDate.toLocaleString().split(",")[1]
          }})
        qq.forEach(e => ww.push(e))
        setRows(ww)
        console.log("DONE FETCH")
      }).catch(e => console.log(e))
    }, []);
  }

  console.log("CURRENT CHANGES", rows)

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
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID'
    },
    {
      id: 'createdAt',
      numeric: true,
      disablePadding: false,
      label: '      DATE'
    },
    {
      id: 'emailAdmin',
      numeric: true,
      disablePadding: false,
      label: '      ADMIN EMAIL'
    },
    {
      id: 'target',
      numeric: true,
      disablePadding: false,
      label: '      TARGET'
    },
    {
      id: 'dataModified',
      numeric: true,
      disablePadding: false,
      label: '      VALUE TYPE'
    },
    {
      id: 'newValue',
      numeric: true,
      disablePadding: true,
      label: '      NEW VALUE'
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

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdAt');
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
      const newSelected = rows.map((n) => n.createdAt);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  GetAllChanges(); // CALL FOR FIRST RENDER

  return (
    <Box sx={{width: '100vw',marginLeft: "-2.5rem"}}>
      <Box sx={{ borderBottom: 0 , width: '100vw' , fontSize: 'large', backgroundColor: deepPurple[200] , height: '5vh' }} align="center" >
      </Box>
      <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , height: '10vh' , backgroundColor: deepPurple[800] , padding: '0vw 1vw 0vw'}} >
        <Box sx={{ display: 'flex' , flexDirection: 'row' , alignItems: 'center' , color: cyan[200] , width: '8vw'  }}>
          <RefreshSharpIcon  fontSize="large" sx={{cursor: "pointer"}} onClick={function() {
            axios.get(`${backendUrl}/users/allAdminChanges`)
            .then((response) => {
              let ww = []
              let qq = response.data.map(function(e) {
                var utcDate = e.createdAt;
                var localDate = new Date(utcDate);
                return {
                  id: e.id,
                  idAdmin: e.idAdmin,
                  emailAdmin: e.emailAdmin,
                  target: e.emailUser ? e.emailUser : e.nameCoin,
                  dataModified: e.dataModified,
                  newValue: e.newValue,
                  createdAt: localDate.toLocaleDateString('es-ES').split("/").reverse().join("/") + " " + localDate.toLocaleDateString('es-ES', {weekday: 'long'}) + "" + localDate.toLocaleString().split(",")[1]
                }})
              qq.forEach(e => ww.push(e))
              setRows(ww)
              console.log("DONE FETCH")
            }).catch(e => console.log(e))
          }}/>
          <Box sx={{ fontSize: 'large' , color: "white" , padding: '0vw 0.3vw 0vw', cursor: "pointer"}} >
            REFRESH
          </Box>
        </Box>
        <Box sx={{ fontSize: 'large' , color: "white" }}>
          ADMIN DASHBOARD  -  CHANGES
        </Box>
        <Box  sx={{  width: '8vw' }}  >
        </Box>
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
                  rowCount={rows.length}
                />
                <TableBody >
                  {stableSort(rows, getComparator(order, orderBy))
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
                            sx={{ width: '11vw' }}
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell sx={{ width: '30vw' }} align="center">
                            {row.createdAt}
                          </TableCell>
                          <TableCell sx={{ width: '30vw' }} align="center">
                            {row.emailAdmin}
                          </TableCell>
                          <TableCell sx={{ width: '30vw' }} align="center">
                            {row.target}
                          </TableCell>
                          <TableCell sx={{ width: '15vw' }} align="center">
                            {row.dataModified}
                          </TableCell>
                          <TableCell sx={{ width: '15vw' }} align="center">
                            {row.newValue}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows}}>
                      <TableCell colSpan={4} />
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
      </Box>
      <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-around' , alignItems: 'center' , height: '7vh' , backgroundColor: deepPurple[100] }} >
        <Box>
          <strong>TARGET:     </strong>Email or Coin Name
        </Box>
      </Box>
      <Box sx={{ display: 'flex' , flexDirection: 'row' , justifyContent: 'space-around' , alignItems: 'center' , height: '9vh' , backgroundColor: deepPurple[800]}}>
        <Box sx={{ color: "white" }}>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Shrink Rows"
          />
        </Box>
        <Box sx={{ color: "white" }} >
          This is a Read-Only Admin Changes Log !
        </Box>
        <Box sx={{ color: "white" }} >
          ©  2022  CripTornado
        </Box>
      </Box>
    </Box>
  );
}