import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CategoriesList from './components/showCategory';
import AddCategory from './components/addCategory';

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<CategoriesList />}>
            
          </Route> 
          <Route path="/Add" element={<AddCategory />} /> 
        </Routes>
      </>

    </>
  );
}

export default App;
