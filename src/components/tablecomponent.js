import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import DownloadComponent from './downloadComponent';

import "../css/style.css";

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

  const [open, setOpen] = useState(false)
  const [fileType, setFileType] = useState(null)

  const onChange = (event) => {
    setFileType(event.target.value)
  }
  return (
    <div>
    <div className='d-flex flex-row justify-content-between mb-3'>
          <Button variant="success" onClick={() => setOpen(true)} style={{height:'40px'}}>Export</Button>
          <TextField
            variant="outlined"
            label="Search"
            sx={{ width: 300 }}
            onChange={e => props.handleSearch(e.target.value)}
          />
      </div>
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
        responsive
        striped
        highlightOnHover
        pointerOnHover
        paginationRowsPerPageOptions={[5, 10, 15, 20, 30, 40]}
        fixedHeader
        customStyles={customStyles}
      />
      
      <Modal
        show={open}
        onHide={() => setOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Export File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 30 }}>

          <Form.Select aria-label="Default select" style={{ padding: 10 }} value={fileType} onChange={onChange}>
            <option>Select File Type</option>
            <option value="CSV">CSV</option>
            <option value="Excel">Excel Sheet</option>
            <option value="Text">Text File</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <DownloadComponent data={props.data} fileType={fileType} setFileType={setFileType} openPopup={setOpen} />
        </Modal.Footer>
      </Modal>

    </div>
  );
};
export default TableComponent;