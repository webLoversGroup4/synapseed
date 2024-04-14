import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import {ContextProvider} from './contexts/ContextProvider'

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>    
  </React.StrictMode>
);
