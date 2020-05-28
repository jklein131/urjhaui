import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import skyline from './assets/images/skyline.jpg'
import berlin_lady from './assets/images/berlin_construction_lady.jpg'
import planning_documents from './assets/images/planning_documents.jpg'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
  image: {
    width: '100%',
    height: '100%',
  }
}));

export default function  Home() {
  const classes = useStyles();
    return (
      <div>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        </Grid>


        <Grid item xs={12} sm={6}>
        <img src={planning_documents} alt={"Planning "} className={classes.image}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        
          <Paper className={classes.paper}>
          <h1>Get Started on Your First JHA</h1>
            Building a Job Hazard Analysis with YourJHA is super easy,
             we make our database of hazards and controls easilly accessable. 
             Once JHA's have been completed, the PDF can be downloaded and distributed to your team. 
            <br>
            </br>
            <br>
            </br>
            <Button  color="primary"  variant="contained" href={"#/jha"}>Start my First JHA! </Button>
          </Paper>
        </Grid>


       
        <Grid item xs={12} sm={6}>
        <img src={skyline} alt={"Skyline "} className={classes.image}/>
        </Grid>

        <Grid item xs={12} sm={6}>
          
          <Paper className={classes.paper}> 
          
          <h1>Bring Your Own Forms</h1>
           Digitalize your common safety forms with our easy to use Form Builder. 
           Forms can contain any number of elements or types of forms, and are organized 
           and filtered by job. 
            <br>
            </br>
            <br>
            </br>
            <Button variant="contained" color="primary" href={"#/form-builder"}>Build My First Form! </Button>
          
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
        <img src={berlin_lady} alt={"Planning "} className={classes.image}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        
          <Paper className={classes.paper}>
          <h1>Get Safety Analytics</h1>
            Transparancy and accountablity are very important when designing a successful safety program, 
            our Analytics Dashboard allows you to view JHA in an easily digestable format.
            <br>
            </br>
            <br>
            </br>
            <Button variant="contained" color="primary" href={"#/dashboard"}>View Analytics Dashboard! </Button>
          </Paper>
        </Grid>
        
        </Grid>


      </div>
    );
  
}
 