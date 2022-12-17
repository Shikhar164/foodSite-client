import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Preference from "./components/Preference";
import RestReg from "./components/RestaurantRegister";
import RestHome from "./components/RestHome";
import UserHome from "./components/UserHome";
import UserOrders from "./components/UserOrders";
import UserRegister from "./components/UserRegister";
import ViewOrders from "./components/ViewOrders";
import ViewRestaurant from "./components/ViewRestaurant";
import CustomerRoute from "./protectedRoutes/customer";
import RestaurantRoute from "./protectedRoutes/restaurant";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch>
      <Switch>
        <Route path="/user/register" exact component={UserRegister} />
      </Switch>
      <Switch>
        <Route path="/rest/register" exact component={RestReg} />
      </Switch>
      <Switch>
        <CustomerRoute path="/user/preference" exact component={Preference} />
      </Switch>
      <Switch>
        <CustomerRoute path="/user/home" exact component={UserHome} />
      </Switch>
      <Switch>
        <CustomerRoute path="/user/home/:id" exact component={ViewRestaurant} />
      </Switch>
      <Switch>
        <CustomerRoute path="/user/orders" exact component={UserOrders} />
      </Switch>
      <Switch>
        <RestaurantRoute path="/restaurant/home" exact component={RestHome} />
      </Switch>
      <Switch>
        <RestaurantRoute path="/restaurant/orders" exact component={ViewOrders} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;