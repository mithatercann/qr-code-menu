import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import { v4 as uuid } from "uuid";
import App from "./App";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
const Routers = () => {
  const [customers, setCustomers] = useState([]);
  const CUSTOMER_API = "./customers.json";

  useEffect(() => {
    const fetchCustomer = async () => {
      fetch(CUSTOMER_API)
        .then((resp) => resp.json())
        .then((respData) => {
          setCustomers(respData);
          console.log(respData);
        });
    };

    fetchCustomer();
  }, []);

  return (
    <Router>
      <Switch>
        {customers.map((customer) => (
          <Route key={uuid()} exact path={`/${customer.name}`}>
            <App />
          </Route>
        ))}
        <Route exact path="/" exact={true}>
          <Home />
        </Route>
        <Route path="*" exact={true}>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routers;
