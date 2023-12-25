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
import PrebuiltProduct from "../pages/Main/Product/pre-built/buttons/index";
import PrebuiltContents from "../pages/Main/Product/pre-built/contents/index";
import AddPreBuiltProduct from "../pages/Main/Product/pre-built/buttons/create";
import AddPrebuiltContents from "../pages/Main/Product/pre-built/contents/create";
import EditPreBuiltProduct from "../pages/Main/Product/pre-built/buttons/edit";
import EditPreBuiltContent from "../pages/Main/Product/pre-built/contents/edit";
import CreatePage from "../pages/Main/Page/create";
import EditPage from "../pages/Main/Page/edit";
import SubPage from "../pages/Main/SubPage/index";
import CreateSubPage from "../pages/Main/SubPage/create";
import EditSubPage from "../pages/Main/SubPage/edit";
import SettingPage from "../pages/Main/Setting/index";

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
    path: "/product/:productId/pre-built/button",
    exact: true,
    component: <PrebuiltProduct />,
  },
  {
    path: "/product/:productId/pre-built/contents",
    exact: true,
    component: <PrebuiltContents />,
  },
  {
    path: "/product/:productId/pre-built/button/create",
    exact: true,
    component: <AddPreBuiltProduct />,
  },
  {
    path: "/product/:productId/pre-built/contents/create",
    exact: true,
    component: <AddPrebuiltContents />,
  },
  {
    path: "/product/:productId/pre-built/button/:id/edit",
    exact: true,
    component: <EditPreBuiltProduct />,
  },
  {
    path: "/product/:productId/pre-built/contents/:id/edit",
    exact: true,
    component: <EditPreBuiltContent />,
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
  {
    path: "/page/:id/edit",
    exact: true,
    component: <EditPage />,
  },
  ,
  {
    path: "/sub-page",
    exact: true,
    component: <SubPage />,
  },
  {
    path: "/sub-page/create",
    exact: true,
    component: <CreateSubPage />,
  },
  {
    path: "/sub-page/:id/edit",
    exact: true,
    component: <EditSubPage />,
  },
  {
    path: "/setting",
    exact: true,
    component: <SettingPage />,
  },
  { path: "*", component: <Navigate to="/login" /> },
];

const authRoutes = [{ path: "/login", component: <Login /> }];

export { userRoutes, authRoutes };
