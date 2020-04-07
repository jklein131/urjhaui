import React, { Component } from "react";
import {
    Route,
    HashRouter
  } from "react-router-dom";

import Home from "./Home";
import Contact from "./Contact";
import Navigation from "./Navigation";
import Jha from "./Jha";
import Incidents from "./Incidents";
import Inspections from "./Inspections";
import Jobs from "./Jobs";
import Documents from "./Documents";
import Dashboard from "./Dashboard";
import FormBuilder from "./FormBuilder";
import Login from "./Login";
 
class Main extends Component {
  render() {
    return (
 
        <HashRouter >
        <div >
            <Navigation ></Navigation>
            <div className="container" >
              <br></br>
                <Route exact path="/" component={Home}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/jha" component={Jha}/>
                <Route path="/incidents" component={Incidents}/>
                <Route path="/inspections" component={Inspections}/>
                <Route path="/admin/jobs/:id?" component={Jobs}/>
                <Route path="/documents" component={Documents}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/form-builder/:id?" component={FormBuilder}/> 
                <Route path="/login" component={Login}/> 
          </div>
        </div>
        </HashRouter>
    );
  }
}
 
export default Main;