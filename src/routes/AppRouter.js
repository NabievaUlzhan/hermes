import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../routes/router";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route =>
                <Route path={route.path} element={route.element} key={route.path} exact={route.exact}/>
            )}
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};

export default AppRouter;