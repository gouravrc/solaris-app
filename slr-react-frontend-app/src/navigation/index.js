import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomeScreen from "../welcome";
import DashboarScreen from "../dashboard";

const AppRoute = () => {
  return (
    <Router>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/dashboard" component={DashboarScreen} />
    </Router>
  );
};

export default AppRoute;
