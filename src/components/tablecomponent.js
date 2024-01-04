import React from 'react';
import DataTable from 'react-data-table-component';
import { TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const customStyles = {
  header: {
    style: {
      backgroundColor: '#a9a9a9',
      color: 'white',
      borderBottom: 'none',
    },
  },
  rows: {
    style: {
      border: '1px solid #a9a9a9',
    },
  },
  headRow: {
		style: {
			backgroundColor: '#a9a9a9',
			minHeight: '56px',
			borderBottomWidth: '1px',
      fontSize: '16px',
      fontWeight: 'bold',
			borderBottomStyle: 'solid',
      textTransform: 'capitalize',
		}
	},

};

const TableComponent = (props) => {
  return (
    <DataTable
      columns={props.columns}
      data={props.data}
      pagination
      paginationServer
      paginationTotalRows={props.totalRows}
      paginationPerPage={props.perPage}
      onChangePage={props.handleChangePage}
      onChangeRowsPerPage={props.handlePerRowsChange}
      persistTableHead
      subHeader
      responsive
      striped
      highlightOnHover
      pointerOnHover
      paginationRowsPerPageOptions={[5,10,15]}
      fixedHeader
      customStyles={customStyles}
      subHeaderComponent={
        <TextField
        variant="outlined"
        label="Search" 
        sx={{ width: 300 }}
        onChange={e => props.handleSearch(e.target.value)}
        />
      }
    />
  );
};
export default TableComponent;