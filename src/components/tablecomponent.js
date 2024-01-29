import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import DownloadComponent from './downloadComponent';
import {InputAdornment} from '@mui/material';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

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

  const [open, setOpen] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [importModal, setImportModal] = useState(false);
  const [file, setFile] = useState(null);

  const onChange = (event) => {
    setFileType(event.target.value);
  }
  const onChangeFile = (event)=>{
    setFile(event.target.files[0]);
  }
  const onImportClick = async () => {
    if (file === null){
      alert("please select the file");
    }else{
      const formdata = new FormData();
      formdata.append("file", file, file.name)
      const response  = await axios.post("http://localhost:8080/api/upload", formdata)
      setImportModal(false)
      setFile(null)
      if (response.data.statusCode === 200){
        alert("File Uploaded Successfully")}
      else if (response.data.statusCode === 500){
          alert("check the orderof the column:- example order[Topics, SubTopics, Links, Source]")
        }
    } 
  }
  return (
    <div>
    
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
        subHeader
        subHeaderAlign='right'
        subHeaderComponent={
          <div  style={{display:'flex',gap:'10px'}}>
          <TextField
            variant="outlined"
            label="Search"
            sx={{
              width: {
                xs: '100%',
                sm: 300,
              },
            }}
            onChange={e => props.handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* <Button variant="success" onClick={() => setOpen(true)} style={{height:'40px'}}><img style={{width:"33px", paddingBottom:"3px"}} src={ExportIcon} alt="fireSpot" title='Export'/> </Button>
          <Button variant="success" onClick={() => setImportModal(true)} style={{height:'40px'}}><img style={{width:"28px"}} src={ImportIcon} alt="fireSpot" title="Import"/> </Button> */}
          <IconButton color="success" Title="Export" onClick={() => setOpen(true)} aria-label="export">
            <DownloadIcon  />
          </IconButton>
          <IconButton color="success" Title="Import" onClick={() => setImportModal(true)} aria-label="import">
            <UploadIcon  />
          </IconButton>
      </div>
        }
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
          <h5>Select File Format</h5>
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

      <Modal
        show={importModal}
        onHide={() => setImportModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Import File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 30 }}>
          <h5>Upload a file to import</h5>
        <input type='file' onChange={onChangeFile} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onImportClick}>Upload</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};
export default TableComponent;