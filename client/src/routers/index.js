import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";

import MainLayout from "@/components/layout/MainLayout";

import Home from "@/components/home/Home";
import About from "@/components/about/About";

const LazyContact = loadable(() => import("@/components/contact/Contact"), {
  fallback: <div>nothing</div>,
});

function Routers() {
  return (
    <Router>
      <MainLayout>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact" render={() => <LazyContact />} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default Routers;
