import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//VIEWS
import Dashboard from "./views/Dashboard";

//Routes
import mainMenu from './routes/mainMenu';
import hiddenRoutes from './routes/hiddenRoutes';

function App() {

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
        </Routes>
      </Dashboard>
    </BrowserRouter>
  );
}

export default App;
