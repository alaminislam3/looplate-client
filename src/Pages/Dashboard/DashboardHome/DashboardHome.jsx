import React from 'react';
import UseUserRole from '../../../Hooks/UseUserRole';
import Loading from '../../../Shared/Loading/Loading';
import NotFound from '../../../Shared/NotFound/NotFound';
import AdminHome from '../Admin/AdminHome';
import CharityHome from '../Charity/CharityHome';
import RestaurantHome from '../Restaurant/RestaurantHome';
import UserHome from '../User/UserHome';

const DashboardHome = () => {
    const {role , roleLoading} =UseUserRole();
    if (roleLoading){
        return <Loading> </Loading>
    }
    if (role === "user") {
        return <UserHome></UserHome>;
        
      } else if (role === "charity") {
        return <CharityHome></CharityHome>;
      } else if (role === "admin") {
        return <AdminHome></AdminHome>;
      } else if (role === "restaurant"){
           return <RestaurantHome></RestaurantHome>
      } else <NotFound> </NotFound>;
};

export default DashboardHome;