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
import JobDashboard from "./JobDashboard";

import Login from "./Login";
import Timeline from './Timeline';
import JhaDashboard from './JhaDashboard'
import FileViewer from './FileViewer'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from './FirebaseConfig';
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
import ResponsiveDialog from './Profile'

import icon from './assets/images/logo-icon.png';
import iconva from './assets/images/va-256x256.png';
import iconpp from './assets/images/pan-pin.png';
import { environment } from "./enviroments/enviroment";


const firebaseAppAuth = firebaseApp.auth();
var providers = environment.isVa() || environment.isPP() ? {
  // googleProvider: new firebase.auth.GoogleAuthProvider(),
  // microsoftProvider: new firebase.auth.OAuthProvider('microsoft.com'),
  //facebookProvider: new firebase.auth.FacebookAuthProvider(), 
  microsoftProvider: new firebase.auth.OAuthProvider('microsoft.com'), 
} :{
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  // microsoftProvider: new firebase.auth.OAuthProvider('microsoft.com'),
  //facebookProvider: new firebase.auth.FacebookAuthProvider(), 
  microsoftProvider: new firebase.auth.OAuthProvider('microsoft.com'), 
};
// Configure FirebaseUI.
var uiConfig = environment.isVa() || environment.isPP() ?  {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    "microsoft.com",
  ]
}: {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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



class Main extends Component {
  state = {
    color: '#0F3656',
    profile: false,
  }
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
      classes,
      ...other
    } = this.props;
    console.log("user",user)
    if (user) {
      {firebase.auth().currentUser.getIdToken(true).then((idToken) => {console.log(idToken)})
              }
    }

    /* create theme on the fly */
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: this.state.color,
        },
        secondary: {
          main: '#FF7812',
        },
      },
      
    });
    const setColor = (c) => {
      this.setState({color:c})
    }
    const setProfile = (c) => {
      this.setState({profile:c})
    }


    /*https://github.com/firebase/firebaseui-web#demo 
        this be lit for login and stuff
        */
    return user
          ? <ThemeProvider theme={theme}>
            {this.state.profile ?  <HashRouter >
              
              <Navigation {...other} color={this.state.color} setProfile={setProfile} setColor={setColor} theme={theme} signOut={signOut} user={this.state.profile}  ></Navigation>
              <div className="container" >
              
                <br></br>
                { this.state.profile.email.includes('@yourjha.com') ||this.state.profile.email.includes('@va.gov') || this.state.profile.email.includes('@uci.edu')  || this.state.profile.email.includes('@ppmechanical.com') ? 
              <React.Fragment>
                  <Route exact path="/" component={Home}/>
                  <Route path="/contact" component={Contact}/>
                
                  <Route path="/jha/:id?" render={(props) => (
    <Jha profile={this.state.profile} />
  )}/> 
                  <Route path="/jha-dashboard" component={JhaDashboard}/>
                  
                  <Route path="/incidents" component={Incidents}/>
                  <Route path="/inspections" component={Inspections}/>
                  <Route path="/admin/jobs/:id?" component={JobDashboard}/>
                  <Route path="/documents" component={Documents}/>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/form-builder/:id?" component={FormBuilderJquery}/> 
                  <Route path="/form-dashboard/:id?" component={FormDashboard}/> 
                  <Route path="/form/:id?" component={FormViewer}/> 
                  <Route path="/login" component={Login}/> 
                  <Route path="/file/:id?" render={(matchProps) =>
  <FileViewer
    {...matchProps}
    {...this.props}
  />
}/>
                  <Route path="/timeline" component={Timeline}/> 
                  </React.Fragment> : <div>You have successfully logged in</div> }
                  
            </div>
          
</HashRouter>: <div><ResponsiveDialog 
color={this.state.color} 
forceOpen={true} 
setColor={setColor}
setProfile={setProfile}
click={()=>{}}></ResponsiveDialog></div>  }
            </ThemeProvider>
          : <div className={classes.loginroot}><Card className={classes.logincard}>
            {environment.isVa() ? <img src={iconva} ></img>: environment.isPP() ? <img src={iconpp} ></img> :<a href="https://yourjha.com"><img src={icon} ></img></a>}
            
            {/*  */}

            <br></br>
            <br></br>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAppAuth}/>
          Powered By: <a href="https://yourjha.com">yourjha.com</a>
       
        </Card>
        <br></br>
         </div>
  
  }
}
 
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(withStyles(styles)(withTheme(Main)));