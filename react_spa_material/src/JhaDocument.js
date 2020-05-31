/* pdf stuff */ 
import React , { Component} from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font} from '@react-pdf/renderer';

import icon from './assets/images/logo-icon.png';

import { makeStyles} from '@material-ui/core/styles';

import roboto_italic from './assets/fonts/roboto/Roboto-ThinItalic.ttf'
import roboto_thin from './assets/fonts/roboto/Roboto-Thin.ttf'
import roboto_reg from './assets/fonts/roboto/Roboto-Regular.ttf'
import roboto_light from './assets/fonts/roboto/Roboto-Light.ttf'
import roboto_condensed from './assets/fonts/roboto/RobotoCondensed-Regular.ttf'
import roboto_condensed_Light from './assets/fonts/roboto/RobotoCondensed-Light.ttf'

Font.register({ family: 'Roboto-Regular', src: roboto_reg }); //eh
Font.register({ family: 'Roboto-Italic', src: roboto_italic });
Font.register({ family: 'Roboto-Light', src: roboto_light });
Font.register({ family: 'Roboto-Thin', src: roboto_thin }); //not terible

Font.register({ family: 'Roboto-Condensed', src: roboto_condensed });
Font.register({ family: 'Roboto-Condensed-Light', src: roboto_condensed_Light });


const docPadding = 35;
// Create styles
const styles = StyleSheet.create({
  
  page: {
  //  
  fontFamily: 'Roboto-Light',
    backgroundColor: '#FFFFFF',
    paddingTop: docPadding,
    paddingBottom: docPadding,
    paddingHorizontal: docPadding,
  },
  root : {
    marginBottom: 15,
  },
  flexup: {
    display:'flex',
    justifyContent: 'space-between',
  },
  section: {
    height: 0,
    flexBasis: '100%',
  },
  section15 :{
    height: 15,
    flexBasis: '100%',
  },
  jhatable :{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jhacellheader : {
    flex : 1,
    margin: '1px',
    textAlign: 'center',
    backgroundColor: "#0D3957",
    color: 'white',
  },
  jhacellheader2 : {
    flex : 2,
    margin: '1px',
    textAlign: 'center',
    backgroundColor: "#0D3957",
    color: 'white',
  },
  jhacell: {
    flex : 1,
    flexGrow: 1,
    //flexBasis: 0,
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    backgroundColor: "#ECEFF1",
  },
  jhacell2: {
    flex : 2,
    flexGrow: 2,
    //flexBasis: 0,
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    backgroundColor: "#ECEFF1",
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 25,
    bottom: 25,
    left: 0,
    fontFamily:'Roboto-Italic',
    right: 0,
    fontSize: 12,
    paddingLeft: docPadding,
    paddingRight: docPadding,
    color: 'grey',
  },
  textDetails: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  italilit :{
    fontFamily: 'Roboto-Thin',
    fontWeight: 'normal',
  },
  header : {
    marginBottom: 15,
  },
});

const JHAHeader = ({rows}) => (
  <View style={styles.jhatable}>
    {rows.map((answer, i) => {                   
           // Return the element. Also pass key     
           return (<Text key={answer.text} style={answer.pos === 1 ? styles.jhacellheader : styles.jhacellheader2 }>{answer.text} </Text>)
        })}
  </View>
);

const JHARow = ({rows}) => (
  <View style={styles.jhatable} wrap={false}>
    
     {rows.map((answer, i) => {
        console.log("yeet", answer.text.trim().split("\\n").filter((val) => val !== "") )
        return <View style={answer.pos === 1 ? styles.jhacell : styles.jhacell2 }>
          {
            answer.text.trim().split("\\n").filter((val) => val !== "").map((val, i) => (
              <Text>{val}</Text>
            ))
           }
        </View>
     })}
     {/*
           // Return the element. Also pass key
           var data = answer.text.trim().split("\\n").map((val, i) => {
             if (val === "") {
             } else {
            return <Text>{val}</Text>
             }
          }
            )
            console.log("dat", data)
           return 
           })
        } */}
        </View>
);

// Create Document Component
export default function MyDocument ({JHA})  {
    return (
  <Document>
    
    <Page size="A4" style={styles.page} wrap >
     <View style={styles.jhatable}>
     <View >
     <Text style={styles.root}>{JHA.activity.name}</Text>
     <Text style={styles.textDetails}>Job Name: <Text style={styles.italilit}>{JHA.jobselect.name}</Text></Text>
     <Text style={styles.textDetails}>Job Address: <Text style={styles.italilit}>{JHA.jobselect.street}</Text></Text>
     <Text style={styles.textDetails}>Job City: <Text style={styles.italilit}>{JHA.jobselect.city}</Text></Text>
     {/* <Text style={styles.textDetails}>Supervisor: <Text style={styles.italilit}>Joshua Klein</Text></Text>
     <Text style={styles.textDetails}>Job Scope: <Text style={styles.italilit}>PLUMN</Text></Text>
     <Text style={styles.textDetails}>Supervisor: <Text style={styles.italilit}>Joshua Klein</Text></Text> */}
     <Text style={styles.textDetails}>Notes: <Text style={styles.italilit}></Text></Text>
     </View>
     <View >
     <Image 
    style={{width: '3cm'}}
        src={icon}
      ></Image>
     </View>
     
    
     </View>
      
    
    <View style={styles.section}>
    
    </View>
    <View style={styles.section15}></View>
    <View>
      <JHAHeader rows={[
        {text: "Task", pos :1},
        {text: "Hazards", pos :1},
        {text: "Controls", pos :2},
      ]}></JHAHeader>
      {JHA.selected.map( (selected_i, i) => {
      return <JHARow rows={[
        {text: selected_i.data.Task, pos :1},
        {text: selected_i.data.Hazards, pos :1},
        {text: selected_i.data.Controls, pos :2},
      ]}></JHARow>
      
      })
    }

      </View> 

      <View style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        
        <View style={styles.jhatable}>
<View>
         <Text>Prepared at yourjha.com</Text>
       </View>
       <View>
         <Text render={({ pageNumber, totalPages }) => ( 
           `${pageNumber} / ${totalPages}`
         )} />
       </View>
        </View>
       
      )} fixed />
     
        
    </Page>
  </Document>
    )
    };