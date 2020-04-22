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
import FormBuilderJquery from "./FormBuilder";
import FormViewer from "./FormViewer";
import FormDashboard from "./FormDashboard";
import Login from "./Login";
import Timeline from './Timeline';

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
                <Route path="/form-builder/:id?" component={FormBuilderJquery}/> 
                <Route path="/form-dashboard/:id?" component={FormDashboard}/> 
                <Route path="/form/:id?" component={FormViewer}/> 
                <Route path="/login" component={Login}/> 
                <Route path="/timeline" component={Timeline}/> 
          </div>
        </div>
        </HashRouter>
    );
  }
}
 
export default Main;