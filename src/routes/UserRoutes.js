import React, { lazy } from 'react';
import AllPackages from '../User/pages/Packages/AllPackages';
const Home = lazy(()=>import('../User/pages/landingPage/Home'));
const Portfolio = lazy(()=>import('../User/pages/portfolio/Portfolio'));
const Contact = lazy(()=>import('../User/pages/contact/Contact'));
const About = lazy(()=>import('../User/pages/about/About'));
const Team = lazy(()=>import('../User/pages/team/Team'));
const ServiceDetail = lazy(()=>import('../User/pages/Services/ServiceDetail'));
const PackagesDetail = lazy(()=>import('../User/pages/Packages/PackagesDetail'));



const userRouter = [
    { path: "/", element: <Home /> },
    { path: "/portfolio", element: <Portfolio /> },
    { path: "/contact", element: <Contact /> },
    { path: "/about", element: <About /> },
    { path: "/team", element: <Team /> },
    { path: "/services", element: <ServiceDetail /> },
    { path: "/packages/:slug", element: <PackagesDetail /> },
    { path: "/packages", element: <AllPackages /> }

]
export default userRouter;