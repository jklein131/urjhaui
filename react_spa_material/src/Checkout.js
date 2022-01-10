
import React from "react";
import { environment } from "./enviroments/enviroment"; 

import MyDocument from './JhaDocument';
import JhaRow from './jha/JhaRow'
import {  PDFViewer, BlobProvider } from '@react-pdf/renderer';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import Button from '@material-ui/core/Button';
import * as m from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import JhaJobSelect from './JhaJobSelect';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
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

export default function Checkout({jha,setJHA, profile}) {
   
    const [myData, setMyData] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [renderState, setRenderState] = React.useState({rendering: false, state: {}, index: ""});

    const [submitting, setsubmitting] = React.useState(false);
    const [cartType, setCartType] = React.useState(undefined);
    const [thisType, setThisType] = React.useState(undefined);

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

   const submitJHA = () => {
    setsubmitting(true);
      var uploadPayload = {
        pdfUrl: jha.pdfUrl,
        jobId: jha.jobselect ? jha.jobselect._id: null,
        data: jha.selected,
        activityId: jha.activity._id, 
        description: jha.description, 
        type: jha.type, 
      }
      environment.fetch('jhacomplete',
        {
          method: 'POST',
          body: JSON.stringify(uploadPayload),
          headers: {
            'Accept': 'application/json',
            "content-type": "application/json",
          }
        }).then((res)=> res.json()).then(j => {
          
         
          window.location = "/#jha/"+j._id
          setJHA({})
        }).catch(v=>{
          alert(v)
          setUploading(false)
          setsubmitting(false)
        })
      
      // if successful, redirect here to the submit page. 
   }
    
    const setStatus = (id) => {
      return (stat) => {
        setJHA({...jha, selected: jha.selected.map((v)=>{
          if (v.data._id = id) {
            v.status = stat 
          }
          return v
        })})
        return 
      }
    }
    const swap = (id, dir) => {
      return () => {
        let selected = jha.selected
        let index = jha.selected.findIndex((v)=> {
          console.log(
            "WTF",v
          )
          return v.data._id === id
        })
        
        if (index > -1) {
          if (dir) {
            if (index+1 in selected) {
                var b = selected[index];
                selected[index] = selected[index+1];
                selected[index+1] = b;
            }
          } else {
            if (index-1 in selected) {
              var b = selected[index];
              selected[index] = selected[index-1];
              selected[index-1] = b;
            }
          }
          console.log("swap",jha.selected)
        }
        setJHA({...jha, selected: selected})
      }
    }
    const switchDown = (id) => {
      return swap(id, true)
    }
    const switchUp = (id) => {
      return swap(id, false)
    }
    // React.useEffect(()=>{
    //   if (renderState.rendering) {
    //     return 
    //   }
    //   if (JSON.stringify(jha) !== renderState.index) {
    //     setRenderState({
    //       rendering: true, 
    //       state: jha,
    //       index: JSON.stringify(jha),
    //     })
    //   }
    // }, [jha, renderState])
    
    React.useEffect(()=>{
      // if the cart is ready to submit submit it
      if (jha.pdfUrl !== undefined && uploading && !submitting) {
        submitJHA()
        return 
      }

      // lazy equal on purpose here
      if (jha.type === cartType ) {
        //nothing to do... 
        return 
      }
      if (jha.type === "positions") {
        setCartType("positions")
        setThisType("PHA")
        environment.fetch('hazards/positions').then((res)=> res.json()).then((res)=> {setMyData(res);console.log("data here",res)})
      } else {
        setCartType("jha")
        setThisType("JHA")
        environment.fetch('hazards').then((res)=> res.json()).then((res)=> {setMyData(res);console.log("data here",res)})
      }
      
    },[jha])

   
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

    if (!jha || !jha.selected || jha.selected.length === 0 ) {
        return <div><h1>Your Cart is empty. </h1><JhaJobSelect JHA={jha} setJHA={setJHA}></JhaJobSelect><Button variant={"outlined"} href="#/jhashopping" color="primary">Start Shopping!</Button> </div>
    }
        return (
          <div key={
            '123124asfasf'
          }>
              <h1>Checkout {thisType}</h1>
              
     
      {!uploading ?<React.Fragment>
        <Button variant={"outlined"} href={"#/"+thisType+"shopping"} color="primary">Add more Tasks!</Button>
        <br></br>
        <br></br>
              <JhaJobSelect JHA={jha} setJHA={setJHA} disabled={uploading}></JhaJobSelect>
              <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Edit" {...a11yProps(0)} />
          <Tab label="PDF" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {jha.selected.map((haz, i)=> (
          <JhaRow 
           JHA={jha} 
           jha_type={jha.type}
           setJHA={setJHA} 
           sections={sections} 
           key={haz.data._id}
           showUp={i !== 0} 
           showDown={i !== jha.selected.length-1}
           isCart={true} 
           goUp={switchUp(haz.data._id)} 
           goDown={switchDown(haz.data._id)} 
           setStatus={setStatus(haz.data._id)} 
           status={3} 
           data={haz.data}></JhaRow>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {jha.activity != undefined ? 
        
           <PDFViewer width="100%" height="1000px" ><MyDocument JHA={jha} profile={profile}/></PDFViewer>
         
       : <p>Error rendering PDF: missing activity</p>}
      </TabPanel>
      </React.Fragment> : <React.Fragment>
        <LinearProgress></LinearProgress>
      </React.Fragment> }
      {uploading ? <BlobProvider document={<MyDocument JHA={jha} profile={profile}/>}>
        {({ blob, url, loading, error }) => {
          
          // Do whatever you need with blob here
          console.log("uploading",blob, url, loading, error )
         if ( !loading) {
           // so here we save all the PDF's in our domain folder based on our emails. Obvi. So if a user leaves, doesn't matter, all
           // their stuff goes here.  
           var getName = "PDF-"+jha.activity.name.replace(/[^a-zA-Z0-9]/g,'_')+"-"+ m().format()
           if(jha.jobselect) {
            getName = "PDF-"+jha.jobselect.name.replace(/[^a-zA-Z0-9]/g,'_')+"-"+jha.activity.name.replace(/[^a-zA-Z0-9]/g,'_')+"-"+ m().format()
           }
           if (uploading) {
            firebase.storage().ref("domain/" +profile.email.split('@')[1]).child(getName).put(blob).then((snapshot) => {
              console.log(snapshot)
                firebase.storage().ref(snapshot.ref.fullPath).getDownloadURL(). then((url) => {
                  setJHA(t => {
                    const newMessageObj = { ...t, "pdfUrl": snapshot.metadata.fullPath, "pdfDownload": url, "pdfName":getName };
                    console.log(newMessageObj)
                    return newMessageObj
                  })
                  return 
                }).then(()=>{})
            
              return 
            })
           } 
          return null
        }
        return null
        }}
      </BlobProvider>: <React.Fragment></React.Fragment>}
      {!uploading? <Button size={"large"} variant={"contained"} color="primary" onClick={()=>setUploading(true)}>Checkout {thisType}</Button> : <React.Fragment></React.Fragment>}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
          </div>
        )
}