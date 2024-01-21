import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Splash from './components/Splash/Splash.tsx';
import { getCurrentUser } from './api/csrf.ts';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as JotaiProvider } from 'jotai';
import { store as reduxStore } from './state/store.ts';
import './index.css';
import './reset.css';
import Home from './components/Home/Home.tsx';
import { setUser } from './state/session.ts';
import Feed from './components/Feed/Feed.tsx';
import Users from './components/User/Users.tsx';
import { jotaiStore } from './state/atoms.ts';

const user = await getCurrentUser();
if (user) reduxStore.dispatch(setUser({user}));


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: 'home',
    element: <Home />,
    children: [{index: true, element: <Feed />}],
  },
  {
    path: 'users',
    element: <Home />,
    children: [{index: true, element: <Users />}],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* it's providers all the way down... isn't frontend great?? */}
    <JotaiProvider store={jotaiStore}>
      <ReduxProvider store={reduxStore}>
        <RouterProvider router={router}/>
      </ReduxProvider>
    </JotaiProvider>
  </React.StrictMode>
);
