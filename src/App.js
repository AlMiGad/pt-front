import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect }  from 'react';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//VIEWS
import Dashboard from "./views/Dashboard";

//PAGES
import Products from "./pages/Products";
import Orders from "./pages/Orders";

//Routes
import mainMenu from './routes/mainMenu';
import hiddenRoutes from './routes/hiddenRoutes';

//Material UI
import { Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button, Grid, TextField,
  } from '@mui/material';

function App() {

  const [nombre, setNombre] = useState("");

  const routes = [...mainMenu, ...hiddenRoutes];

  return (
    <BrowserRouter>
      <Dashboard>
        <Routes>
          {
            routes.map((route, index) => {
              return(<Route key={`routeKey-${index}`} path={route.path} element={<route.component/>} />);
            })
          }
          <Route path="*" element={<p>NO HAY NADA</p>} />
        </Routes>
      </Dashboard>
    </BrowserRouter>
  );
}

export default App;
