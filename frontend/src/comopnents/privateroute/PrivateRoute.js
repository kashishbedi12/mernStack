import React from "react";
import {Outlet,Navigate} from 'react-router-dom';

function PrivateRoute(){
    let auth=localStorage.getItem('user');
    return auth?<Outlet /> : <Navigate to='/' />;
}
export default PrivateRoute;