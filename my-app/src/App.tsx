import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CategoriesList from './components/showCategory';
import AddCategory from './components/addCategory';
import RegisterPage from './components/Register';

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<CategoriesList />}> 
          </Route> 
          <Route path="/Add" element={<AddCategory />} /> 
          <Route path="/Register" element={<RegisterPage></RegisterPage>} /> 
        </Routes>
      </>

    </>
  );
}

export default App;
