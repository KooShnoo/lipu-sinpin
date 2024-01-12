import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Splash from './components/Splash/Splash.tsx';
import './index.css';
import { restoreCSRF } from './api/csrf.ts';

restoreCSRF();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
