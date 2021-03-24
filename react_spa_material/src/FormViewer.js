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
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import FormDocument from "./doc_classes/FormDocument"
import LinearProgress from '@material-ui/core/LinearProgress';
import {  PDFViewer,BlobProvider } from '@react-pdf/renderer';

import Initicon from 'react-initicon';
//import ReactDOM from "react-dom";
//import "./styles.css";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import * as m from 'moment'
import firebaseApp from './FirebaseConfig';
import GenericJobSelector from "./GenericJobSelector";

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



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select a Job', 'Complete Form Details', 'View Completed PDF'];
}

function getStepContent(stepIndex) {
  
}





 function HorizontalLabelPositionBelowStepper({id,  setTemplate}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [formTemplate, setFormTemplate] = React.useState({})
  const [job, setJob] = React.useState({})
  const [jobError, setJobError] = React.useState(false)
  const [submittedData, setSubmit] = React.useState({})

  const handleNext = () => {
  
    setActiveStep((prevActiveStep) => {
      console.log()
      if (prevActiveStep === 0 && !('_id'  in job )) {
        setJobError("required")
        return prevActiveStep
      }
      else {
        setJobError(false)
        return prevActiveStep + 1 
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const useHookWithRefCallback = () =>  {
    const ref = React.useRef(null)
    const setRef = React.useCallback(node => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }
      
      if (node) {
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.
        console.log("form visable", formTemplate)
        $(node).formRender({
          formData: formTemplate.template,
        })
      }
      
      // Save a reference to the node
      ref.current = node
    }, [formTemplate])
    
    return [setRef]
  }
  const Fromref = React.useRef(null)
  const useHookWithRefCallbackForm = () =>  {
    
    const setRef = React.useCallback(node => {
      if (Fromref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }
      
      if (node) {
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.
      }
      
      // Save a reference to the node
      Fromref.current = node
    }, [])
    
    return [setRef]
  }

  const [myForm] = useHookWithRefCallbackForm();

  var [myTemplate] = useHookWithRefCallback()

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSubmit = (e) => {
    console.log("SUMBITTED", e,  )
    e.preventDefault();
    const el = findDOMNode(Fromref.current);

    console.log($(Fromref));
    //TODO submit this form to the formbucket endpoint with all the data 
    console.log("FORM DATA", $(el).serializeArray())
    console.log("TEMPLATE", formTemplate.template)
    setSubmit($(el).serializeArray())
    //get files TODO 
    console.log($(el).find( "input[type='file']"))
    return true
  };

React.useEffect(()=> {
  environment.fetch( 'formtemplates/'+id)
  .then(res => res.json())
  .then((data) => {
    var initialValuesTmp = {} 
    console.log("jobs_data", data)
    data.template.map((value, i) => {
      initialValuesTmp[value.name] = ""
    })
    setTemplate(data.template)
    setFormTemplate(data)
    
    

  }).catch(console.log)
},[])

  return (
    <div className={classes.root}>
      <div>
               <div style={{textAlign:"center"}}>
             <Icon name={formTemplate.name} size={150}></Icon>
             
             <Typography variant="h3" component="h2">
             {formTemplate.name}
             </Typography>
             <br></br>
             </div>
          

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div>
            {
        (() => {
          
    switch (activeStep) {
    case 0:
      return <div><GenericJobSelector value={job} setvalue={setJob} error={jobError}></GenericJobSelector><br></br><br></br></div>;
    case 1:
      
      return <form ref={myForm} onSubmit={(e) => (handleSubmit(e) && handleNext())} >
       <div id="fb-editor" ref={myTemplate} /> 
       <div> 
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit" >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
  </div>
  
    </form>
    case 2:
      console.log(submittedData)
      var doc = <FormDocument values={submittedData} formName={formTemplate.name} template={formTemplate.template}></FormDocument>
      return <BlobProvider document={doc}>
       {({ blob, url, loading, error }) => {
         // Do whatever you need with blob here
         console.log("uploading",blob, url, loading, error, )
        if ( !loading) {
         firebase.storage().ref("user/" +firebase.auth().currentUser.uid).child("PDF-FORM-"+formTemplate.name +"--"+ m().format()).put(blob).then((snapshot) => {
           console.log(snapshot.metadata.fullPath)
           console.log(formTemplate.template)
           var uploadPayload = {
             pdfUrl: snapshot.metadata.fullPath,
             data: submittedData,
             templateId: formTemplate._id,
             template:formTemplate,
             jobId: job._id,
           }
           environment.fetch('formcomplete',
             {
               method: 'POST',
               body: JSON.stringify(uploadPayload),
               headers: {
                 'Accept': 'application/json',
                 "content-type": "application/json",
               }
             }).then( (res) =>res.json()). then((res) => console.log(res))
           return 
         })
         return <PDFViewer width="100%" height="1000px" >{doc}</PDFViewer>
       }
       return <LinearProgress />
       }}
     </BlobProvider>
    default:
      return 'Unknown stepIndex';
  }})()}</div>
  {activeStep !== 1 ? 
            <div> 
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
  </div> : <div></div> }
          </div>
        )}
      </div>
    </div>
    </div>
  );
}


class FormViewer extends Component {
    state = {
      jobs: {},
      form_id: "",
      initial: undefined, 
      submitted: false, 
    }
  
    fb = React.createRef();

    setRender(template) {
      
    }


    render() {

      
      //cannot render refs inside function component, so we'll do it out here 

      const { classes } = this.props;
      
      if (this.state.submitted == true && this.state.jobs.template != undefined) {
       
      }
        return (
          <div>
            

            <Link 
  href={"#form-dashboard/"+this.props.match.params["id"]}>
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
               
             
             <HorizontalLabelPositionBelowStepper setTemplate={this.setRender} id={this.props.match.params["id"]} ></HorizontalLabelPositionBelowStepper>
               </Paper>
          
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