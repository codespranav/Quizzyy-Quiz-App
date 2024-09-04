import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App';
import UserContext from './contexts/user-context';
import Home from './pages/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserContext>
    <RouterProvider router={router} />
  </UserContext>
  </StrictMode>
)
