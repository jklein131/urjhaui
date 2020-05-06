import React, { Component } from "react";
import {
    Route,
    HashRouter,
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

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './FirebaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withStyles,makeStyles, createMuiTheme, ThemeProvider, withTheme} from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete";

import CardMedia from '@material-ui/core/CardMedia';

import icon from './assets/images/logo-icon.png';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  // microsoftProvider: new firebase.auth.OAuthProvider('microsoft.com'),
  facebookProvider: new firebase.auth.FacebookAuthProvider(), 
  microsoftProvider: new firebase.auth.OAuthProvider('microsoft.com'), 
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    "microsoft.com",
 
  ]
}; 

const styles = {
  logincard: {
    minWidth: 275,
    maxWidth: 400,
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 25,
    textAlign: "center",
    padding: 20,
  },
  loginroot: {
    height: "100%",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0F3656',
    },
    secondary: {
      main: '#FF7812',
    },
  },
  
});

class Main extends Component {
  
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
      classes,
      ...other
    } = this.props;
    console.log("user",user)
    /*https://github.com/firebase/firebaseui-web#demo 
        this be lit for login and stuff
        */
    return user 
          ? <ThemeProvider theme={theme}>
            <HashRouter >
         
              <Navigation {...other} theme={theme} signOut={signOut} user={user}  ></Navigation>
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
          
            </HashRouter>
            </ThemeProvider>
          : <div className={classes.loginroot}><Card className={classes.logincard}>
            <a href="https://yourjha.com"><img src={icon} ></img></a>
            {/*  */}
            <br></br>
            <br></br>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAppAuth}/>
        </Card>
         </div>
  
  }
}
 
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(withStyles(styles)(withTheme(Main)));