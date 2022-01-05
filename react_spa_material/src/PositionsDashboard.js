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

//maeruialk ui 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Link from '@material-ui/core/Link';

import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
 
import PositionsDashboardTable from './PositionsDashboardTable'

import Initicon from 'react-initicon';
import FormBuilder from "./FormBuilder";
//import ReactDOM from "react-dom";
//import "./styles.css";

import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

import MUIDataTable from "mui-datatables";

const columns = ["Name", "Company", "City", "State",{
        name: "Edit",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button onClick={() => firebase.storage().ref(value).getDownloadURL().then((snapshot) => {
                window.open(snapshot)
                return 
              })}>
                Edit
              </button>
            );
          }
        }
      }];


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


class PositionsDashboard extends Component {
  
    state = {
    
      form_id: "",
    }


    fb = createRef();
    render() {
      const { classes } = this.props;
        return (
          <div>
          <Paper elevation={5} className={classes.root}>
            <div>

              <div style={{textAlign:"center"}}>
            <Icon name={"Positions Hazard Analysis"} size={150}></Icon>
            
            <Typography variant="h3" component="h2">
            {"Positions Hazard Analysis"}
</Typography>
<br></br>

<Link 
  href={"#phashopping"}>
<Button
          
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Create New PHA
        </Button>
        </Link>
  
        
<br></br>
<br></br>
</div>
<Typography variant="h4" ></Typography>




          </div>
          </Paper>
          <div > 
          <PositionsDashboardTable  ></PositionsDashboardTable>
          </div>
        </div>
         
        )
      }
  }
  
PositionsDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
   
  export default withStyles(styles)(PositionsDashboard);