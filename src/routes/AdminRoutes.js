import React, { lazy } from 'react';
import PrivateRoutes from './PrivateRoutes';

const MyPortfolio = lazy(() => import('../Admin/components/AdminPortfolio/MyPortfolio'));
const MyAbout = lazy(() => import('../Admin/components/AdminAbout/MyAbout'));
const AddAbout = lazy(() => import('../Admin/components/AdminAbout/AddAbout'));
const EditAbout = lazy(() => import('../Admin/components/AdminAbout/EditAbout'));
const AddPortfolio = lazy(() => import('../Admin/components/AdminPortfolio/AddPortfolio'));
const UpdatePortfolio = lazy(() => import('../Admin/components/AdminPortfolio/EditPortfolio'));

const AddHighlight = lazy(() => import('../Admin/components/AdminHighlight/addHighlight'));
const MyHighlight = lazy(() => import('../Admin/components/AdminHighlight/getHighlight'));
const AddTeam = lazy(() => import('../Admin/components/AdminTeam/AddTeam'));
const GetTeam = lazy(() => import('../Admin/components/AdminTeam/GetTeam'));
const EditTeam = lazy(() => import('../Admin/components/AdminTeam/EditTeam'));
const AdminLogin = lazy(() => import('../Admin/components/AdminLogin/AdminLogin'));
const MyPackages = lazy(() => import('../Admin/components/AdminPackages/MyPackages'));
const AddPackages = lazy(() => import('../Admin/components/AdminPackages/AddPackages'));

const AdminRouter = [
  { path: '/admin/add/portfolio', element: <PrivateRoutes><AddPortfolio /></PrivateRoutes> },
  { path: '/admin/update/portfolio/:id', element: <PrivateRoutes><UpdatePortfolio /></PrivateRoutes> },
  { path: '/admin/dashboard', element: <PrivateRoutes><MyPortfolio /></PrivateRoutes> },
  { path: '/admin/get/about', element: <PrivateRoutes><MyAbout /></PrivateRoutes> },
  { path: '/admin/add/about', element: <PrivateRoutes><AddAbout /></PrivateRoutes> },
  { path: '/admin/edit/about/:id', element: <PrivateRoutes><EditAbout /></PrivateRoutes> },
  
  
  { path: '/admin/add/highlight', element: <PrivateRoutes><AddHighlight /></PrivateRoutes> },
  { path: '/admin/get/highlight', element: <PrivateRoutes><MyHighlight /></PrivateRoutes> },
  { path: '/admin/add/team', element: <PrivateRoutes><AddTeam /></PrivateRoutes> },
  { path: '/admin/get/team', element: <PrivateRoutes><GetTeam /></PrivateRoutes> },
  { path: '/admin/get/packages', element: <PrivateRoutes><MyPackages /></PrivateRoutes> },
  { path: '/admin/add/packages', element: <PrivateRoutes><AddPackages /></PrivateRoutes> },
  { path: '/admin/edit/team/:id', element: <PrivateRoutes><EditTeam /></PrivateRoutes> },
  { path: '/admin/login', element: <AdminLogin /> },
];

export default AdminRouter;