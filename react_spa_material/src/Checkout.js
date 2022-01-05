
import React from "react";
import MyDocument from './JhaDocument';
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
   
    

    const doc = <MyDocument JHA={jha} profile={profile}/>
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    if (!jha || !jha.selected || jha.selected.length === 0 ) {
        return <div><h1>Your Cart is empty. </h1><JhaJobSelect positions={true} JHA={jha} setJHA={setJHA}></JhaJobSelect><Button variant={"outlined"} href="#/jhashopping" color="primary">Start Shopping!</Button> </div>
    }
        return (
          <div>
              <h1>Checkout JHA</h1>
              
              <JhaJobSelect positions={true} JHA={jha} setJHA={setJHA}></JhaJobSelect>
              <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Edit" {...a11yProps(0)} />
          <Tab label="PDF" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
      {jha.activity != undefined ? <BlobProvider document={doc}>
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
          firebase.storage().ref("domain/" +profile.email.split('@')[1]).child(getName).put(blob).then((snapshot) => {
            console.log(snapshot)
            if (jha.pdfUrl === undefined) {
              firebase.storage().ref(snapshot.ref.fullPath).getDownloadURL(). then((url) => {
                setJHA(t => {
                  const newMessageObj = { ...t, "pdfUrl": snapshot.metadata.fullPath, "pdfDownload": url, "pdfName":getName };
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
      </BlobProvider> : <p>Error rendering PDF: missing activity</p>}
      </TabPanel>
          
      
          
          </div>
        )
}