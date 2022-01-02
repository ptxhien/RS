import React, { Suspense, lazy, Fragment } from "react";
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import HomePage from "./Pages/Home";
const Dashboard = lazy(() => import("./Pages/Dashboards"));

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage></HomePage>,
        auth: false
    },
    {
        path: '/login',
        exact: true,
        main: () => <LoginPage></LoginPage>,
        auth: false
    },
    {
        path: '/register',
        exact: true,
        main: () => <RegisterPage></RegisterPage>,
        auth: false
    },
]

export default routes;