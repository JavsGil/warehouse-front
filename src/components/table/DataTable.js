import React,{ useContext } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from 'react-bootstrap/Button';
import UserContext from "../../utils/context/userContext";
import {typeUser} from "../../utils/helper"



 const  DataTable = ({title,columns,rows,setShow,titleModal,handleDownload=()=>{}}) => {

  const { userDetails } = useContext(UserContext);

  const {user}  = userDetails;
  console.log(typeUser.includes(user.tipo),'typeUser.includes(user.tipo)')

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleShowEmpres =()=>  {
      setShow(true)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '80%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableCell align="center" colSpan={2}>
               {title}
              </TableCell>
              <TableCell align="center" colSpan={2}>
              {typeUser.includes(user.tipo) && (
                <Button variant="primary" onClick={handleShowEmpres} >
                {titleModal}
                </Button>
              )}
              
              </TableCell>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      {console.log(column.label,'column')}
                      if(column.label === 'Acciones'){
                        return(
                          <div style={{paddinRigth:'10px',textAlign:'right'}}>
                            {typeUser.includes(user.tipo) &&(
                              <Button 
                              variant="primary"
                              onClick={()=>handleDownload(row)}
                              >
                              Descargar
                              </Button>
                            )}
                          </div>
                        )
                      }
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default DataTable;