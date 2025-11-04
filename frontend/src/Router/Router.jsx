import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Pages/Root';
import Home from '../Pages/Home';
import Host from '../Pages/Host/Host';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            path: "/host",
            Component: Host,
        }
    ]
  },
]);

