import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Splash from './components/Splash/Splash.tsx';
import { getCurrentUser, restoreCSRF } from './api/csrf.ts';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import './index.css';
import './reset.css';
import Home from './components/Home/Home.tsx';
import { setUser } from './state/session.ts';

const user = await getCurrentUser();
if (user) store.dispatch(setUser({user}));


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: 'home',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
