import $ from "jquery";
import React, { Component, createRef} from "react";
import { environment } from "./enviroments/enviroment"; 
import PropTypes from 'prop-types';

//bootstrapTable
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Form from 'react-bootstrap/Form';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

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

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require('formBuilder/dist/form-render.min.js');
require("./control_plugins/starRating")


class FormViewer extends Component {
  
    state = {
      jobs: {},
      form_id: "",
    }

    getAndViewJobs(id) {
        fetch( environment.apiUrl+'formtemplates/'+id)
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
    componentWillMount() {
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
            <Link 
  href={"#form-dashboard/"+this.state.form_id}>
<Button
          
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Dashboard
        </Button>
        </Link>
        <br></br>
        <br></br>
          <Paper elevation={5} className={classes.root}>
            <div>
              <div style={{textAlign:"center"}}>
            <Icon name={this.state.jobs.name} size={150}></Icon>
            
            <Typography variant="h3" component="h2">
            {this.state.jobs.name}
</Typography>
<br></br>
</div>
            <Form>
            <div id="fb-editor" ref={this.fb} /> {/* generated form goes here */}
            <br></br>
            
            </Form>
          </div>
          </Paper>
          <br></br>
          <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
        </div>
        )
      }
  }
  
  FormViewer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
   
  export default withStyles(styles)(FormViewer);