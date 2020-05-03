import $ from "jquery";
import React, { Component, createRef} from "react";
import { findDOMNode } from 'react-dom';
import { environment } from "./enviroments/enviroment"; 
import PropTypes from 'prop-types';

//bootstrapTable
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

import FormDocument from "./doc_classes/FormDocument"

import {  PDFViewer } from '@react-pdf/renderer';

import Initicon from 'react-initicon';
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
      initial: undefined, 
      submitted: false, 
      submitted_data: [], 
    }

    getAndViewJobs(id) {
        fetch( environment.apiUrl+'formtemplates/'+id)
        .then(res => res.json())
        .then((data) => {
          var initialValuesTmp = {} 
          console.log("jobs_data", data)
          data.template.map((value, i) => {
            initialValuesTmp[value.name] = ""
          })
          this.setState({ jobs: data })
          this.setState({ initial: initialValuesTmp })
          this.setState({ form_id: id })
          
          
          $(this.fb.current).formRender({
            formData: data.template,
          })

        }).catch(console.log)
      }

    fb = createRef();
    componentWillMount() {
        if (this.props.match !== undefined && this.props.match.params["id"] !== undefined && this.state.form_id !== this.props.match.params["id"]) {
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
      const handleSubmit = (e) => {
        console.log("SUMBITTED", e, )

        e.preventDefault();
        const el = findDOMNode(this.refs.myForm);
        console.log();
        //TODO submit this form to the formbucket endpoint with all the data 
        this.setState({ submitted: true })
        console.log("FORM DATA", $(el).serializeArray())
        console.log("TEMPLATE", this.state.jobs.template)
        this.setState({ submitted_data: $(el).serializeArray() })
        //get files TODO 
        console.log($(el).find( "input[type='file']"))
      }
      if (this.state.submitted == true && this.state.jobs.template != undefined) {
        return <PDFViewer width="100%" height="1000px"><FormDocument values={this.state.submitted_data} formName={this.state.jobs.name} template={this.state.jobs.template}></FormDocument></PDFViewer>
      }
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
         {this.state.initial !== undefined ? (
           
        
             <Paper elevation={5} className={classes.root}>
             <div>
               <div style={{textAlign:"center"}}>
             <Icon name={this.state.jobs.name} size={150}></Icon>
             
             <Typography variant="h3" component="h2">
             {this.state.jobs.name}
             </Typography>
             <br></br>
             </div>
             <form ref="thisForm" onSubmit={handleSubmit} ref="myForm" >
               <div id="fb-editor" ref={this.fb} /> {/* generated form goes here */}
               <Button
               variant="contained"
               color="primary"
               className={classes.button}
               type="submit"
             >
                Submit
             </Button>
             </form>
              
               </div>
               </Paper>
         ) : <span>loading</span> }
            



            
            <br></br>

          
          
          <br></br>
          
        </div>
        )
      }
  }
  
  FormViewer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
   
  export default withStyles(styles)(FormViewer);