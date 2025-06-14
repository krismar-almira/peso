import React,{useState,useEffect} from "react";
import Layout from './layouts/dashboard.jsx';
import Dashboard from './pages/dashboard.jsx';
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router';
import UserPage from "./pages/userpage.jsx";
import { useAuthProvider } from "./context/authContext.jsx";
import Preloader from "./components/preloader.jsx";
import CompanyPage from "./pages/companyPage.jsx";
import PositionPage from "./pages/positionsPage.jsx";
import CompanyPosting from "./pages/companyPosting.jsx";
import SkillPage from "./pages/skillPage.jsx";
import JobFairSchedule from "./pages/jobFairSchedule.jsx";
import EducationPage from "./pages/educationPage.jsx";
import ApplicantPage from "./pages/applicantPage.jsx";
import Nsrp1Page from "./pages/nsrp1Page.jsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: Dashboard,
          },
          {
            path: 'applicant',
            Component: ApplicantPage,
          },
          {
            path: 'nsrp1',
            Component: Nsrp1Page,
          },
          {
            path: 'schedule',
            Component: JobFairSchedule,
          },
          {
            path: 'posting',
            Component: CompanyPosting,
          },
          {
            path: 'config/user',
            Component: UserPage,
          },
          {
            path: 'config/company',
            Component: CompanyPage,
          },
          {
            path: 'config/position',
            Component: PositionPage,
          },
          {
            path: 'config/skill',
            Component: SkillPage,
          },
          {
            path: 'config/education',
            Component: EducationPage,
          },
          // {
          //   path: 'employees/:employeeId?/*',
          //   Component: EmployeesCrudPage,
          // },
        ],
      },
    ],
  },
]);


const Submain = ()=>{
    const {isAuth} = useAuthProvider();
    return(
        isAuth?
      <RouterProvider router={router} />:
      <Preloader/>
    )
}
export default Submain;