import React, { lazy } from 'react';
import AllPackages from '../User/pages/Packages/AllPackages';
import PrivacyPolicy from '../User/pages/LegalPages/PrivacyPolicy';
import LegalNotice from '../User/pages/LegalPages/LegalPages';
import TermsOfService from '../User/pages/LegalPages/TermsOfService';
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
    { path: "/packages", element: <AllPackages /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms-of-Service", element: <LegalNotice /> },
    { path: "/legal-notice", element: <TermsOfService /> },
 
    
    

]
export default userRouter;