import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import MultipleSelect from './components/multipleSelect';
import { Header } from './components/components';


function App() {
  return (
    <BrowserRouter>
    <Header/>
        <Routes>
          <Route path='/singleselect' element={<Home/>} />
          <Route path='/' element={<MultipleSelect/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
