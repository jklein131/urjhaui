import $ from "jquery";
import React, { Component, createRef} from "react";
import { environment } from "./enviroments/enviroment"; 
import PropTypes from 'prop-types';

//bootstrapTable
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Form from 'react-bootstrap/Form';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import JobDashboardTable from './JobDashboardTable'
//maeruialk ui 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Link from '@material-ui/core/Link';

import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import firebaseApp from './FirebaseConfig';

import Initicon from 'react-initicon';
import FormBuilder from "./FormBuilder";
import { LinearProgress } from "@material-ui/core";
//import ReactDOM from "react-dom";
//import "./styles.css";
import JobEditModal from './JobEditModal'
var seedrandom = require('seedrandom');

const Icon = ({name, size}) => {
  if (name === undefined) {
    name =""
  }
  var rng = seedrandom(name);
  return (
<Initicon size={size} seed={rng()*10} text={name.toUpperCase()} />
  )
}


const styles = theme => ({
  root: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    
  },
});
function JobDashboard ({classes}) {
    const [jobs, setJobs] = React.useState(jobs);

    React.useEffect(()=> {
        environment.fetch( 'jobs/')
        .then(res => res.json())
        .then((data) => {
          setJobs( data)
          console.log("jobs_data", data)
        }).catch(console.log)
      },[])
    var setJobOuter = (j)=> {
      if (jobs.some((v)=> v._id === j._id)) {
          setJobs( jobs.map(el => (el._id === j._id ? j : el)))
        console.log(jobs)
        return
      }
      setJobs(
       [j, ...jobs]
      )
    }
  
        return (
          <div>
          <Paper elevation={5} className={classes.root}>
            <div>

              <div style={{textAlign:"center"}}>
            <Icon name={ "Job Manager"} size={150}></Icon>
            
            <Typography variant="h3" component="h2">
            {"Job Manager"}
</Typography>
<Typography>{/* description */}</Typography>
<br></br>


  <JobEditModal renderbutton={(r)=> (<Button
          onClick={r}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Create New Job
        </Button>)} setJob={setJobOuter}></JobEditModal>
        
<br></br>
<br></br>
</div>

<Typography variant="h4" ></Typography>

          </div>
          </Paper>
          <JobDashboardTable jobs={jobs} setJob={setJobOuter}></JobDashboardTable>
        </div>
        )
  }
  
  JobDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
   
  export default withStyles(styles)(JobDashboard);