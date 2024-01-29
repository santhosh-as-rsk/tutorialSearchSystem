import React,{useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap/dist/css/';
import data from './MyVIE-trend.json';

const TrendJson = () => {
  const[newValue,setNewValue] = useState(null);
  const Json = ()=> {
    let params = [];
    let newJson = {};
    for(const jsonData in data.trend_info){
      for( const jsonnewValue in data.trend_info[jsonData] ){
        if (params.includes(jsonnewValue)){continue;}
        else{ params.push(jsonnewValue);}
      }
      console.log(params);
    }
    for (let i=0; i<= params.length;i++){
      let newj = {};
      for (const json in data.trend_info){
        if (data.trend_info[json][params[i]]){
          newj[json] = data.trend_info[json][params[i]];
        }
        else{
          if (Object.keys(data.trend_info[json]).length === 0) {
            newj[json] = {}
          }
        }
      }
      newJson[params[i]] = newj;
    }
    console.log(newJson);
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(newJson))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "trend_info.json";
    link.click();
  };
  const onChangeFile = (event)=>{
    // console.log(event.target.files[0]);
    setNewValue(event.target.files[0])
    const newvalue  = readJsonFile(event.target.files[0]);
    console.log("newvalue");
    console.log(newvalue);
  }
  const readJsonFile = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = event => {
      if (event.target) {
        resolve(JSON.parse(event.target.result))
      }
    }

    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
  })
  useEffect(()=>{
    console.log(newValue);
  },[newValue]);
  return (
    <div>
      <input type="file" accept='.json,application/json' onChange={onChangeFile}/>
      <Button onClick={Json}>button</Button>
    </div>
  );
};

export default TrendJson;
