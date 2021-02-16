import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
// import AccountView from 'src/views/account/AccountView';
// import CustomerListView from 'src/views/customer/CustomerListView';
// import DashboardView from 'src/views/reports/DashboardView';
// import LoginView from 'src/views/auth/LoginView';
// import NotFoundView from 'src/views/errors/NotFoundView';
// import ProductListView from 'src/views/product/ProductListView';
// import RegisterView from 'src/views/auth/RegisterView';
// import SettingsView from 'src/views/settings/SettingsView';
// import DoctorView from 'src/views/doctor/DoctorView';
// import ChemistView from 'src/views/chemist/chemistView';
// import DoctorListView from 'src/views/list-doctor/DoctorListView';
// import ChemistListView from 'src/views/list-chemist/ChemistListView';
// import MrView from './views/mr/MrView';
// import MrListView from './views/list-mr/MrListView/index'; 
// import SeniorListView from './views/list-senior/SeniorListView/index';
// import CityListView from './views/list-city/CityListView/index';
// import WorkPlaceListView from './views/list-workplace/WorkPlaceListView/index';
// import WorkTypeListView from './views/list-worktype/WorkTypeListView/index';
// import HolidayListView from './views/list-holiday/HolidayListView/index';
// import TaskListView from './views/list-task/TaskListView/index';
import SignUp from './screens/signUp/SignUp';


const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {path:'/signup',element:<SignUp/>},
      //  { path: 'account', element: <AccountView /> },
      // { path: 'view/doctors', element: <DoctorListView /> },
      // { path:'view/chemist',element:<ChemistListView/>},
      // {path:'view/mr',element:<MrListView/>},
      // {path:'view/senior',element:<SeniorListView/>},
      // {path:'view/city',element:<CityListView/>},
      // {path:'view/workplace',element:<WorkPlaceListView/>},
      // {path:'view/worktype',element:<WorkTypeListView/>},
      // {path:'view/holiday',element:<HolidayListView/>},
      // {path:'view/task',element:<TaskListView/>},
      // { path: 'dashboard', element: <DashboardView /> },
      // // { path: 'products', element: <ProductListView /> },
      // {path:'doctor',element:<DoctorView/>},
      // {path:'chemist',element:<ChemistView/>},
      // {path:'mr',element:<MrView/>},
      // { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  // {
  //   path: '/',
  //   element: <MainLayout />,
  //   children: [
  //     { path: 'login', element: <LoginView /> },
  //     { path: 'register', element: <RegisterView /> },
  //     { path: '404', element: <NotFoundView /> },
  //     { path: '/', element: <Navigate to="/app/dashboard" /> },
  //     { path: '*', element: <Navigate to="/404" /> }
  //   ]
  // }
];

export default routes;
