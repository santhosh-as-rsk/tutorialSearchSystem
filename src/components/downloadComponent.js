import React from 'react';
import { Button } from 'react-bootstrap';

const DownloadComponent = (props)=>{

    const downloadFile = (format) => {
        fetch('http://localhost:8080/api/fetchCsvFile',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.data)
        })
        .then(async response=>{
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'tutorial-links.' + format;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    const downloadxl = async ()=>{
        fetch('http://localhost:8080/api/fetchExcelFile',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.data)
        })
        .then(async response=>{
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'tutorial-links.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    const onClick = ()=>{
        if(props.data.length>0 && props.fileType !==null){
            if (props.fileType === 'CSV'){ downloadFile("csv"); }
            else if(props.fileType === 'Excel'){ downloadxl(); }
            else if(props.fileType === 'Text'){ downloadFile("txt");}
            props.openPopup(false);
            props.setFileType(null)
        }
        else{
            alert("please select Export File Type"); 
        }
    }

    return(
        <Button variant='success' onClick={onClick}>Export</Button>
    )
}

export default DownloadComponent;