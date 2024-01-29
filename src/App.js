import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import MultipleSelect from './components/multipleSelect';
import { Header } from './components/components';
import TrendJson from './components/TrendJson';
import Newplot from './components/newplot';


function App() {
  return (
    <BrowserRouter >
    <Header/>
        <Routes>
          <Route path='/singleselect' element={<Home/>} />
          <Route path='/' element={<MultipleSelect/>} />
          <Route path="/trendjson" element={<TrendJson/>} />
          <Route path="/plot" element={<Newplot/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
