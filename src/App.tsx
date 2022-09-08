import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthorEdit } from './views/authorEdit';
import { AuthorNew } from './views/authorNew';
import { Main } from './views/main';

function App() {
  return (
    <div className="App">
      <h1>Favorite Authors</h1>
      <Routes>
        <Route path="" element={<Main/>}/>
        <Route path="/authors" element={<Main/>}/>
        <Route path="/authors/new" element={<AuthorNew/>}/>
        <Route path="/authors/:id/edit" element={<AuthorEdit/>}/>
      </Routes>
    </div>
  );
}

export default App;
