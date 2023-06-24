import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Main/Login";
import User from "../pages/Main/User/index";
import CreateUser from "../pages/Main/User/create";
import EditUser from "../pages/Main/User/edit";
import Product from "../pages/Main/Product/index";
import Order from "../pages/Main/Order/index";
import ManageProduct from "../pages/Main/User/manage-product";
import Page from "../pages/Main/Page/index";
import CreateProduct from "../pages/Main/Product/create";
import EditProduct from "../pages/Main/Product/edit";
import CreatePage from "../pages/Main/Page/create";

const userRoutes = [
  {
    path: "/",
    exact: true,
    component: <Navigate to="/user" />,
  },
  {
    path: "/user",
    exact: true,
    component: <User />,
  },
  {
    path: "/user/create",
    exact: true,
    component: <CreateUser />,
  },
  {
    path: "/user/:id/edit",
    exact: true,
    component: <EditUser />,
  },
  {
    path: "/user/:id/manage-product",
    exact: true,
    component: <ManageProduct />,
  },
  {
    path: "/product",
    exact: true,
    component: <Product />,
  },
  {
    path: "/product/create",
    exact: true,
    component: <CreateProduct />,
  },
  {
    path: "/product/:id/edit",
    exact: true,
    component: <EditProduct />,
  },
  {
    path: "/order",
    exact: true,
    component: <Order />,
  },
  {
    path: "/page",
    exact: true,
    component: <Page />,
  },
  {
    path: "/page/create",
    exact: true,
    component: <CreatePage />,
  },
  { path: "*", component: <Navigate to="/user" /> },
];

const authRoutes = [{ path: "/login", component: <Login /> }];

export { userRoutes, authRoutes };
