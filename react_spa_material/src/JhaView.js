
import React, { Component, createRef} from "react";
import { environment } from "./enviroments/enviroment"; 
import LinearProgress from '@material-ui/core/LinearProgress';
import { Document, PDFViewer, BlobProvider } from '@react-pdf/renderer';

import {
  useParams
} from "react-router-dom";
import PropTypes from 'prop-types';
import JhaRow from './jha/JhaRow'
//bootstrapTable
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';

//maeruialk ui 
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import Paper from '@material-ui/core/Paper';
 
import Initicon from 'react-initicon';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      key={`simple-tabpanel-${index}`}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));
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
const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  paper: {
    display: "grid",
    padding: theme.spacing(2),
    textAlign: '',
    // color: theme.palette.text.secondary,
  },
  skeleton :{
    margin: "auto",
  }
}));

function JhaView() {
  const classes = useStyles();
    let params = useParams();
    const [loading, setLoading] = React.useState(true)
    const [myjha, setmyjha] = React.useState(undefined);
    const [myData, setMyData] = React.useState(undefined);
    const [value, setValue] = React.useState(0);
    const [pdfUrl, setpdfUrl] = React.useState(undefined);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    React.useEffect(()=>{
      if (!params["id"]) {
        return 
      }
      environment.fetch( 'jhacomplete/'+params["id"])
    .then(res => res.json())
    .then((data) => {
      console.log("MY JHA", data); setmyjha(data); setLoading(false);
    }).catch(console.log)
    }, [])
    React.useEffect(()=>{
      if (myjha === undefined) {
        return 
      }
      if (pdfUrl === undefined) {
        firebase.storage().ref(myjha.pdfUrl).getDownloadURL().then((snapshot) => {
          setpdfUrl(snapshot)
          return snapshot
        })
      }
     
      if (myjha.type === "positions") {
        environment.fetch('hazards/positions').then((res)=> res.json()).then((res)=> {setMyData(res);console.log("data here",res)})
      } else {
        environment.fetch('hazards').then((res)=> res.json()).then((res)=> {setMyData(res);console.log("data here",res)})
      }
      
    },[myjha])
    const [sections, setSections] = React.useState(undefined)
    const reducer = (accumulator, currentValue) => {
        if ("section" in accumulator) {
            // this is the first case, where the key is in the object
            // so we should return our first array as the acculmator 
            // if the sections object already exsists, we should keep the value from it (someone modified myData)
            return {
                [accumulator.section]: sections === undefined ? false :sections[currentValue.section] , 
            }
        }
        return {...accumulator,[currentValue.section]: sections === undefined ? false : sections[currentValue.section]  }
    };

    React.useEffect(()=> {
        if (myData) {
 // run reduce the data into the sections headers using the function above
 setSections(myData.reduce(reducer)); 
        }
    },[myData])

    if (!params["id"]) {
      return <Paper elevation={5} className={classes.root}>
        <h1>Page not found</h1>
      </Paper>
    }

    // {loading ? <Skeleton variant="circle" width={150} height={150} /> :  }
   return  <div>
         <Paper elevation={5} className={classes.paper}>

              <div style={{textAlign:"center"}}>
              {loading ? <Skeleton className={classes.skeleton} variant="circle" width={150} height={150} /> : <Icon name={myjha.activityId.name} size={150}></Icon> }
            
              {loading ? <Skeleton className={classes.skeleton} variant="rect" width={250} height={75} /> : <Typography variant="h3" component="h2">
            {myjha.activityId.name}
</Typography> }
            

{loading ? <React.Fragment>
  <br></br><Skeleton className={classes.skeleton} variant="rect" width={150} height={25} /></React.Fragment> : <React.Fragment>
  
  {myjha.jobId ?<Typography variant="h6" component="h6">
            {"Job: "+ myjha.jobId.name}
</Typography>:<React.Fragment></React.Fragment>}</React.Fragment>}
            

<br></br>

</div>
<Typography variant="h4" ></Typography>

        
          </Paper>
          <div > 
            <br></br>
          {
            loading ? <LinearProgress></LinearProgress>:<React.Fragment>
              <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Edit" {...a11yProps(0)} />
          <Tab label="PDF" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      {myjha.data.map((haz, i)=> (
          <JhaRow 
           setStatus={()=>{
             // there is only one status to set, but let's make it this. 
             console.log()
           }}
           JHA={myjha}
           jha_type={myjha.type}
           setmyjha={setmyjha} 
           sections={sections} 
           key={haz.data._id}
           isView={true} 
           status={3} 
           data={haz.data}></JhaRow>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Button variant="contained" color="primary" onClick={()=> window.open(pdfUrl)}>
        Open In New Tab
      </Button>
      <br></br>
      <br></br>
          {pdfUrl ? <iframe width="100%" height="1000px" src={pdfUrl}></iframe> : <div></div>}
      
      </TabPanel>
            </React.Fragment> 
          }
        
          </div>
        </div>
  }
  export default JhaView;