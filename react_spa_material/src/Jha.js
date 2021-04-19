import React, { Component} from "react";
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Edit } from "@material-ui/icons";
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import * as m from 'moment'
import JhaJobSelect from './JhaJobSelect'
import MyDocument from './JhaDocument'

import {Resizable} from "re-resizable"
import {
  useParams} from "react-router-dom";

import JhaControl from './jha/JhaControl'

import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { environment } from "./enviroments/enviroment"; 
import firebaseApp from './FirebaseConfig';

import {  PDFViewer, BlobProvider } from '@react-pdf/renderer';

import { Prompt } from 'react-router'
import { useHistory } from 'react-router-dom'

import LiveHelpIcon from '@material-ui/icons/LiveHelp';





//styles
const useStyles = makeStyles(theme => ({
  navroot: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 0,
  },
  root: {
    width: '100%',
  },
  tabroot: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  padding: {
    padding: theme.spacing(0, 2),
  }, 
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  one: {
    display: 'flex',
    height: '100%', 
    flexGrow: 1,
  },
  paper: {
        
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


//help tooltips 
const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);


function HorizontalLinearStepper({jha, profile}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [JHA, setJHA] = React.useState(jha ? jha : {}); 
  const [done, setDone] = React.useState(false); 
  const [sections, setSections] = React.useState(false);
  const [myData, setMyData] = React.useState(false);
  React.useEffect(()=>{
    environment.fetch('hazards').then((res)=> res.json()).then((res)=> {setMyData(res);console.log("data here",res)})
  },[])

  const isStepOptional = step => {
    return false
    //return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (JHA.jobselect === "" || JHA.jobselect === undefined || JHA.jobselect === null) {
        setJHA(t => {
          const newMessageObj = { ...t, "jobselecterror": "Required" };
          console.log(newMessageObj)
          return newMessageObj
        })

        console.log("lit", JHA)
        return
      }
      if (JHA.activity === "" || JHA.activity === undefined || JHA.activity === null) {
        setJHA(t => {
          const newMessageObj = { ...t, "activityerror": "Required" };
          console.log(newMessageObj)
          return newMessageObj
        })

        console.log("lit", JHA)
        return
      }
    }
    if (activeStep === 1) {
      console.log("as",JHA)
    }
    if (activeStep === 2) {
      //At this step, the JHA has been "finished"
      //We will now maake the payload to upload the 
      console.log("done", JHA)
     var uploadPayload = {
        pdfUrl: JHA.pdfUrl,
        jobId: JHA.jobselect._id,
        data: JHA.selected,
        activityId: JHA.activity._id, 
      }
      environment.fetch('jhacomplete',
        {
          method: 'POST',
          body: JSON.stringify(uploadPayload),
          headers: {
            'Accept': 'application/json',
            "content-type": "application/json",
          }
        })
      setDone(true)
    }


    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    //https://medium.com/@michaelchan_13570/using-react-router-v4-prompt-with-custom-modal-component-ca839f5faf39
    setDone(false)
    setJHA({})
    setActiveStep(0);
  };
  const getStepContent = (step) => {
    //JHA and setJHA are all the data collected all the way through the form to get stuff and provide validation 
    switch (step) {
      case 0:
        return <JhaJobSelect JHA={JHA} setJHA={setJHA}></JhaJobSelect>
      case 1:
        console.log("JHA DATA", JHA)
        return (
        <div>
          <br></br>
         <JhaControl profile={profile} JHA={JHA} setJHA={setJHA} myData={myData} setMyData={setMyData}>
        </JhaControl>
        </div>
        )
      case 2:
        console.log("JHA DATA", JHA)
        const doc = <MyDocument JHA={JHA} profile={profile}/>
       
        return (
          <div>
          <BlobProvider document={doc}>
        {({ blob, url, loading, error }) => {
          // Do whatever you need with blob here
          console.log("uploading",blob, url, loading, error )
         if ( !loading) {
           // so here we save all the PDF's in our domain folder based on our emails. Obvi. So if a user leaves, doesn't matter, all
           // their stuff goes here. 
          firebase.storage().ref("domain/" +profile.email.split('@')[1]).child("PDF-"+JHA.jobselect.name.replace(/[^a-zA-Z0-9]/g,'_')+"-"+JHA.activity.name.replace(/[^a-zA-Z0-9]/g,'_')+"-"+ m().format()).put(blob).then((snapshot) => {
            console.log(snapshot)
            if (JHA.pdfUrl === undefined) {
              firebase.storage().ref(snapshot.ref.fullPath).getDownloadURL(). then((url) => {
                setJHA(t => {
                  const newMessageObj = { ...t, "pdfUrl": snapshot.metadata.fullPath, "pdfDownload": url };
                  console.log(newMessageObj)
                  return newMessageObj
                })
              })
          }
            return 
          })
          return <PDFViewer width="100%" height="1000px" >{doc}</PDFViewer>
        }
        return <LinearProgress />
        }}
      </BlobProvider>
      
          
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  const history = useHistory()
  React.useEffect(() => {
    const unblock = history.block((location, action) => {
      console.log("location", location, action)
      if (activeStep === 1) {
        handleBack();
        return false
      }
      if (activeStep === 2) {
        handleBack();
        return false
      }
      if (!done && JHA.jobselect !== undefined ) {
        return window.confirm("You have unsaved changes, are you sure you want to leave?");
      }
      return true;
    });
  
    return () => {
      unblock();
    };
  }, [activeStep]);

  return (
    <div>
    <div className={classes.root}>
      
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <LightTooltip title={getStepTooltip(index)}>
            <Step key={Math.random()} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
            </LightTooltip>
          );
        })}
      </Stepper>
      <div >
        {activeStep === steps.length ? (
          <div>
            <Paper elevation={5} className={classes.paper} >
            
            <h4> JHA Completed! </h4>
            <Typography className={classes.instructions}>
              Congratulations on completing a Job Hazard Analysis!
            </Typography>

            

                    <a href={JHA.pdfDownload} target="_blank" rel="noopener noreferrer" download>
                    <Button variant="contained" color="primary" >
                        {/* <i className="fas fa-download"/> */}
                        Download PDF
                    </Button>
                  </a>
            
                  <br></br>
                  
           
            </Paper> 

            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            
            <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              {myData === false ? <CircularProgress /> :
                 <Button
                 variant="contained"
                 color="primary"
                 onClick={handleNext}
                 className={classes.button}
               >
                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
               </Button>
              }
           
              
              
            </div>
          </div>
        )}
      </div>
      
    </div>
  </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
function getSteps() {
  return ['Job and Activity Description', 'Hazards and Controls', 'Render and Save']
}

function getStepTooltip(step) {
  switch (step) {
    case 0:
      return 'Job Specific Details';
    case 1:
    
        return "Select Hazards and controls for your activity";
      
    case 2:
      return 'Save as a PDF, distribute to your team. ';
    default:
      return 'Unknown step';
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


//  function SimpleTabs({sections}) {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div>
//       <br></br>
//     <h4> 1. Select Hazards</h4>
//     <div className={classes.navroot}>
      
//       <AppBar position="static">
//         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//           <Tab label="Library" {...a11yProps(0)} />
         
//           <Tab label={
//              <Badge  className={classes.padding} badgeContent={4} color="error">Recommended </Badge>
//           } {...a11yProps(1)} 
//           />
          
//           <Tab label="Search" {...a11yProps(2)} />
//         </Tabs>
//       </AppBar>

//       <Resizable width={200} height={200}>
//         <TabPanel value={value} index={0}>
//           {/* TODO veritcal tabs works for desktop, but not mobile. for mobile i'm thinking list with sticky headers */}
//           <VerticalTabs sections={sections}>

//           </VerticalTabs>
//       </TabPanel>
//       </Resizable>
//       <Resizable width={200} height={200}>
//       <TabPanel value={value} index={1}>
//         Recommended data
//       </TabPanel>
      
//       </Resizable>
      
//       <Resizable width={200} height={200}>
//       <TabPanel value={value} index={2}>
//         <span>Search</span>
//       </TabPanel>
//     </Resizable>
//     </div>
//     </div>
//   );
// }

//sortable stuff 
const SortableItem = SortableElement(({value}) => 
<ExpansionPanel >
<ExpansionPanelSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1bh-content"
  id="panel1bh-header"
>

  <Typography className={useStyles().heading}>Slip And Falls</Typography>
  <Typography className={useStyles().secondaryHeading}>I am an expansion panel</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
  <Typography>
    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
    maximus est, id dignissim quam.
  </Typography>
</ExpansionPanelDetails>
</ExpansionPanel>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </div>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList hideSortableGhost={false} items={this.state.items} onSortEnd={this.onSortEnd} handleChange={this.props.handleChange} expanded={this.props.expanded} />;
  }
}


//vertical tabs 
function TabPanelVertical(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  sections: PropTypes.any,
};


// function VerticalTabs({sections}) {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);
  

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
  
    
//   return (
//     <div className={classes.tabroot}>
//        <Tabs
//         orientation="vertical"
//         variant="scrollable"
//         value={value}
//         onChange={handleChange}
//         aria-label="Vertical tabs example"
//         className={classes.tabs}
//       >
        
//        {Object.keys(sections).map((answer, i) => (
//         <Tab key={i} label={answer} {...a11yProps(i)} />
//         ))}
//       </Tabs>
  
// {/* <Tab label="Plumbing" {...a11yProps(1)} />
//         <Tab label="Crane Pick" {...a11yProps(2)} />
//         <Tab label="Ladders" {...a11yProps(3)} />
//         <Tab label="General" {...a11yProps(4)} />
//         <Tab label="Fuel/Waste" {...a11yProps(5)} />
//         <Tab label="Hand Tools" {...a11yProps(6)} /> 
        
//         expanded={expanded === comps.Task}
        
//         */
//         }
//       {Object.keys(sections).map((answer, i) => (
//         <TabPanelVertical style={{overflowY : 'scroll'}} value={value} index={i} sections={sections}>
//           <div>
//           {sections[answer].map((comps, i) => (
//             <ExpansionPanel  > 
//             <ExpansionPanelSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel4bh-content"
//               id="panel4bh-header"
//             >
//               <Typography className={classes.heading}>{comps.hazards}</Typography>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails>
//               <Typography>
//                 {
//                   comps.controls
//                 }
//               </Typography>
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//           ))}
//           </div>
//         </TabPanelVertical>
//         ))}
//     </div>
//   );
// }
// //end vertical tabs


// function ControlledExpansionPanels() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <div className={classes.root}>
//       <h4>2. Customize Controls</h4>
//        <SortableComponent expanded={expanded} handleChange={handleChange}></SortableComponent>
      
      
//     </div>
//   );
// }

function Jha({profile}) {
  let params = useParams();
  const classes = useStyles();
  const [JHA, setJHA] = React.useState(undefined)
  React.useEffect(()=>{
    if (params["id"] !== undefined) {
      environment.fetch('jhacomplete/'+params["id"]).then((res)=> res.json()).then((res)=> {
        setJHA({
          selected: res.data.map((v)=> {
              return {status:3, ...v}
          }),
          selectedKeys: res.data.map((v)=> {
            return v.data._id
          }),
          activity: res.activityId,
          jobselect: res.jobId, 
        })
      }).err
    }
  },[]) //run and get the JHA start doc on run if available. 
    return (
      <div key={Math.random()}>
        {/* <Fab class={classes.fab} color="primary" aria-label="help">
          <LiveHelpIcon ></LiveHelpIcon>
        </Fab> 
        TODO: add help information in some sort of drawer or popup so that we can give people more 
        information when filling out the JHA
        */}
        <HorizontalLinearStepper jha={JHA} profile={profile}></HorizontalLinearStepper>
        <br></br>
      </div>
    )
}
 
export default Jha;