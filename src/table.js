import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './App.css';

export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              {/* <TableCell>Index</TableCell> */}
            <TableCell>Product Id</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Ingredients</TableCell>
            <TableCell align="right">Preetica Comment</TableCell>
            <TableCell align="right">Maribelle QC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row,index) => (
            <TableRow
              key={row["Product Id"]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">{index}</TableCell> */}
              <TableCell  align="right">{row["Product Id"]}</TableCell>
              <TableCell align="right">{row["Product Name"]}</TableCell>
              <TableCell align="right" dangerouslySetInnerHTML={{__html: row["Ingredients"]}} ></TableCell>
              <TableCell align="right">{row["Preetica Comment"]}</TableCell>
              <TableCell align="right">{row["PMaribelle QC"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}