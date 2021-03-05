import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import App from "./App";

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
      {customers.map((customer) => (
        <Route key={uuid()} path={`/${customer.name}`}>
          <App />
        </Route>
      ))}
    </Router>
  );
};

export default Routers;
