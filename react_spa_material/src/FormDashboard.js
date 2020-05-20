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



import Initicon from 'react-initicon';
import FormBuilder from "./FormBuilder";
//import ReactDOM from "react-dom";
//import "./styles.css";

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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class FormDashboard extends Component {
  
    state = {
      jobs: {},
      form_id: "",
    }

    getAndViewJobs(id) {
        environment.fetch( 'formtemplates/'+id)
        .then(res => res.json())
        .then((data) => {
          this.setState({ jobs: data })
          this.setState({ form_id: id })
          console.log("jobs_data", data)
          
          $(this.fb.current).formRender({
            formData: data.template,
          })

        }).catch(console.log)
      }

    fb = createRef();
    componentDidMount() {
        if (this.props.match !== undefined && this.props.match.params["id"] !== undefined) {
            const jobid = this.props.match.params["id"] 
            this.getAndViewJobs(jobid);
        }
    }
    componentDidUpdate() {
      if (this.state.form_id !== this.props.match.params["id"]) {
        this.getAndViewJobs(this.props.match.params["id"])
      }
    }
    render() {
      const { classes } = this.props;
        return (
          <div>
          <Paper elevation={5} className={classes.root}>
            <div>

              <div style={{textAlign:"center"}}>
            <Icon name={this.state.jobs.name} size={150}></Icon>
            
            <Typography variant="h3" component="h2">
            {this.state.jobs.name}
</Typography>
<br></br>


<Link 
  href={"#form/"+this.state.form_id}>
<Button
          
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Create New {this.state.jobs.name}
        </Button>
        </Link>
  
        
<br></br>
<br></br>
</div>

<Typography variant="h4" >Previous Forms</Typography>
<TableContainer component={Paper}>

      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
          </Paper>
        </div>
        )
      }
  }
  
  FormDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
   
  export default withStyles(styles)(FormDashboard);