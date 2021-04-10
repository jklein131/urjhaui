/* pdf stuff */ 
import React , { Component} from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font} from '@react-pdf/renderer';

import icon from './assets/images/va.png';
import hazardicon from './assets/images/hazard.PNG';

import { makeStyles} from '@material-ui/core/styles';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import * as m from 'moment'

import roboto_italic from './assets/fonts/roboto/Roboto-ThinItalic.ttf'
import roboto_thin from './assets/fonts/roboto/Roboto-Thin.ttf'
import roboto_reg from './assets/fonts/roboto/Roboto-Regular.ttf'
import roboto_light from './assets/fonts/roboto/Roboto-Light.ttf'
import roboto_bold from './assets/fonts/roboto/Roboto-Bold.ttf'
import roboto_condensed from './assets/fonts/roboto/RobotoCondensed-Regular.ttf'
import roboto_condensed_Light from './assets/fonts/roboto/RobotoCondensed-Light.ttf'

// Font.register({
//   family: "Montserrat",
//   src:
//   "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
//   });
  Font.register({ family: 'Roboto-Regular', src: roboto_reg }) //eh
Font.register({ family: 'Roboto-Italic', src: roboto_italic })
Font.register({ family: 'Roboto-Light', src: roboto_light })
Font.register({ family: 'Roboto-Thin', src: roboto_thin }) //not terible
Font.register({ family: 'Roboto-Bold', src: roboto_bold }) //not terible
Font.registerHyphenationCallback(word => [word]);

// Font.register({ family: 'Roboto-Condensed', src: roboto_condensed });
// Font.register({ family: 'Roboto-Condensed-Light', src: roboto_condensed_Light });

const docPadding = 35;
// Create styles
const styles = StyleSheet.create({
  
  page: {
   
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
  totalractitle: {
    textAlign: 'center',
    backgroundColor: "#0D3957",
    color: 'white',
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
  ractitle :{
    fontSize: '4mm',
    textDecoration: 'underline',
    margin: '1 1 1 0',
    padding: '2 2 2 0',
  },
  hazrdcell1: {
    flex : 10,
    // flexGrow: 1,
    //flexBasis: 0,
    margin: '1px',
    padding: '2px',
    fontSize: '5mm',
    // backgroundColor: "#ECEFF1",
  },
  hazrdcellicon: {
    flex : 1,
    flexGrow: 1,
    flexBasis: 0,
    margin: '1px',
    marginLeft: '2mm',
    padding: '2px',
    fontSize: '3.5mm',
    // backgroundColor: "#ECEFF1",
  },
  hazrdcell2: {
    flex : 10,
    // flexGrow: 1,
    //flexBasis: 0,
    margin: '1px',
    marginTop: '2mm',
    marginLeft: '0mm',
    padding: '2px',
    fontSize: '3.5mm',
    // backgroundColor: "#ECEFF1",
  },
  hazrdcell3: {
    paddingLeft: '25px',
    marginLeft: '5mm',
    padding: '2px',
    fontSize: '3.4mm',
  },
  raccell: {
    flex : 1,
    flexGrow: 1,
    //flexBasis: 0,
    textAlign: 'center',
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    backgroundColor: "#ECEFF1",
  },
  raccellwrapper: {
    flex : 10,
    //flexBasis: 0,
    textAlign: 'center',
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    backgroundColor: "#ECEFF1",
  },
  raccellspacer: {
    flex : 1,
    //flexBasis: 0,
  
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
  },
  raccellspacer1: {
    flex : 2,
    //flexBasis: 0,
  
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
  },
  raccellheader: {
    flex : 1,
    flexGrow: 1,
    //flexBasis: 0,
    textAlign: 'center',
    margin: '1px',
    textAlign: 'center',
    backgroundColor: "#0D3957",
    color: 'white',
  },
  raccellred: {
    flex : 1,
    flexGrow: 1,
    //flexBasis: 0,
    textAlign: 'center',
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    backgroundColor: "red",
  },
  raccellorange: {
    flex : 1,
    flexGrow: 1,
    //flexBasis: 0,
    textAlign: 'center',
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    backgroundColor: "orange",
  },
  raccellyellow: {
    flex : 1,
    flexGrow: 1,
    //flexBasis: 0,
    textAlign: 'center',
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    backgroundColor: "yellow",
  },
  raccellgreen: {
    flex : 1,
    flexGrow: 1,
    //flexBasis: 0,
    textAlign: 'center',
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    color: 'white',
    backgroundColor: "green",
  },
  bold: {
    textDecoration:'underline',
    fontFamily: 'Roboto-Bold',
  },
  bold1: {
    textDecoration:'underline',
    fontFamily: 'Roboto-Bold',
    fontSize: '3.9mm',
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
  sig: {
    height: '27',
    borderWidth: '1',
    borderStyle: 'solid',
    padding: '3',
  }
});

const JHAHeader = ({rows}) => (
  <View style={styles.jhatable}>
    {rows.map((answer, i) => {                   
           // Return the element. Also pass key     
           return (<Text key={answer.text} style={answer.pos === 1 ? styles.jhacellheader : styles.jhacellheader2 }>{answer.text} </Text>)
        })}
         <View style={styles.raccellheader}>
              <Text>RAC</Text>
        </View>
  </View>
);
const options = [
  "Low",
  "Medium",
  "High",
  "Extreme"
];
const values = [
  "L",
  "M",
  "H",
  "E"
];
const colors = [
  "green",
  "black",
  "orange",
  "red"
];
const backgroundColors = [
  "white",
  "yellow",
  "white",
  "white"
];
const textcolors = [
  "white",
  "black",
  "black",
  "black"
];

const JHAHazardRow = ({task, hazards, control, rac}) => (
  <View>
  <View style={styles.jhatable}>
  <Text style={styles.hazrdcell1} >{task}</Text>
  <Text style={styles.hazrdcellicon} > 
 <Image 
  style={{width: '.75cm',
  height:'.75cm'}}
  
      src={hazardicon}
    ></Image>
    </Text>
  <Text style={styles.hazrdcell2} >{hazards.split("\n").filter((val) => val !== "").join(', ')}</Text>
      </View>
      <Text style={styles.hazrdcell3} >Risk Assessment: <Text style={{...styles.bold1, color: colors[values.indexOf(rac)], backgroundColor: backgroundColors[values.indexOf(rac)]}}>{options[values.indexOf(rac)]}</Text></Text>
  <Text style={styles.hazrdcell3}>{control}</Text>
  <View style={styles.section15}></View>
  </View>
)

//hazard color: #FF7812;
// const JHARow = ({rows}) => (
//   <View style={styles.jhatable} wrap={false}>
    
//      {rows.map((answer, i) => {
//         console.log("yeet", answer.text.trim().split("\\n").filter((val) => val !== "") )
//         return <View style={answer.pos === 1 ? styles.jhacell : styles.jhacell2 }>
//           {
//             answer.text.trim().split("\\n").filter((val) => val !== "").map((val, i) => (
//               <Text>{val}</Text>
//             ))
//            }
         
//         </View>
//      })}
//          <View style={styles.raccellgreen}>
//               <Text>Low</Text>
//         </View>
//         </View>
// );

const RACTable = () => (
  <View>
    <Text style={styles.ractitle}>Overall Risk Assessment: </Text>
    <Text style={{fontSize: '3.5mm',}}> “Probability” is the likelihood to cause an incident, near miss, or accident and identified as: Frequent, Likely, Occasional, Seldom or Unlikely. 

“Severity” is the outcome/degree if an incident, near miss, or accident did occur and identified as: Catastrophic, Critical, Marginal, or Negligible</Text>
  <View style={styles.jhatable} wrap={false}>
    {/* <View style={styles.raccell}>
              <Text>Severity</Text>
        </View>
        <View style={styles.raccell}>
             <Text>Probability</Text>
        </View> */}
    </View>
    {/* row 2  */}
      <View style={styles.jhatable} wrap={false}>
      <View style={styles.raccell}>
<Text></Text>
</View>
        <View style={styles.raccell}>
              <Text>Frequent</Text>
        </View>
        <View style={styles.raccell}>

      <Text>Likely</Text>
      </View>
      <View style={styles.raccell}>
      <Text>Occational</Text>
      </View>
      <View style={styles.raccell}>
      <Text>Seldom</Text>
      </View>
      <View style={styles.raccell}>
      <Text>Unlikely</Text>
</View>

      </View>
      {/* row 3 */}
      <View style={styles.jhatable} wrap={false}>
      <View style={styles.raccell}>
<Text>Catastrophic</Text>
</View>
        <View style={styles.raccellred}>
              <Text>Extreme</Text>
        </View>
        <View style={styles.raccellred}>

      <Text>Extreme</Text>
      </View>
      <View style={styles.raccellorange}>
      <Text>High</Text>
      </View>
      <View style={styles.raccellorange}>
      <Text>High</Text>
      </View>
      <View style={styles.raccellyellow}>
      <Text>Medium</Text>
</View>

      </View>
{/* row 4  */}
<View style={styles.jhatable} wrap={false}>
      <View style={styles.raccell}>
<Text>Critical</Text>
</View>
        <View style={styles.raccellred}>
              <Text>Extreme</Text>
        </View>
        <View style={styles.raccellorange}>

      <Text>High</Text>
      </View>
      <View style={styles.raccellorange}>
      <Text>High</Text>
      </View>
      <View style={styles.raccellyellow}>
      <Text>Medium</Text>
      </View>
      <View style={styles.raccellgreen}>
      <Text>Low</Text>
</View>

      </View>
      {/* row 5  */}
<View style={styles.jhatable} wrap={false}>
      <View style={styles.raccell}>
<Text>Marginal</Text>
</View>
        <View style={styles.raccellorange}>
              <Text>High</Text>
        </View>
        <View style={styles.raccellyellow}>
      <Text>Medium</Text>
      </View>
      <View style={styles.raccellyellow}>
      <Text>Medium</Text>
      </View>
      <View style={styles.raccellgreen}>
      <Text>Low</Text>
      </View>
      <View style={styles.raccellgreen}>
      <Text>Low</Text>
</View>

      </View>
          {/* row 6 */}
<View style={styles.jhatable} wrap={false}>
      <View style={styles.raccell}>
<Text>Negligible </Text>
</View>
        <View style={styles.raccellyellow}>
              <Text>Medium</Text>
        </View>
        <View style={styles.raccellgreen}>

      <Text>Low</Text>
      </View>
      <View style={styles.raccellgreen}>
      <Text>Low</Text>
      </View>
      <View style={styles.raccellgreen}>
      <Text>Low</Text>
      </View>
      <View style={styles.raccellgreen}>
      <Text>Low</Text>
</View>

      </View>
      {/* end */}
      </View>
)

const SignOff = () => (
  <View>
    <Text style={styles.ractitle}>Required Signatures: </Text>
    <Text style={styles.sig}>1. Shop Supervisor </Text>
    <Text style={styles.sig}>2. Contractor </Text>
    <Text style={styles.sig}>3. COR / PM </Text>
    <Text style={styles.sig}>4. Foreman </Text>
    <Text style={styles.sig}>5. Safety </Text>
    </View>
)

// Create Document Component
export default function MyDocument ({JHA, profile})  {
  console.log("PDF profile", profile)
    var totalRacIndex = values.indexOf(JHA.selected.reduce( (accumulator, currentValue) => values.indexOf(accumulator.data.rac) > values.indexOf(currentValue.data.rac) ? accumulator: currentValue).data.rac)
    console.log("total rac", totalRacIndex)
    return ( <Document>
    
    <Page size="A4" style={styles.page} wrap  >
     <View style={styles.jhatable}>
     <View >
     <Text style={styles.root}>{JHA.activity.name}  (Total Risk: <Text style={{color: colors[totalRacIndex],backgroundColor:backgroundColors[totalRacIndex],...styles.bold}}>{
     
     options[totalRacIndex] }</Text>)</Text>
     <Text style={styles.textDetails}>Job Name: <Text style={styles.italilit}>{JHA.jobselect.name}</Text></Text>
     <Text style={styles.textDetails}>Job Location: <Text style={styles.italilit}>{JHA.jobselect.street}</Text></Text>
     {/* <Text style={styles.textDetails}>Job City: <Text style={styles.italilit}>{JHA.jobselect.city}</Text></Text>*/}
     <Text style={styles.textDetails}>Prepared By: <Text style={styles.italilit}>{profile.displayName} ({profile.email})</Text></Text> 
     <Text style={styles.textDetails}>Prepared At: <Text style={styles.italilit}>{m().format('MMMM Do YYYY, h:mm a')}</Text></Text>
     {/* <Text style={styles.textDetails}>Job Scope: <Text style={styles.italilit}>PLUMN</Text></Text> */}
     {/* <Text style={styles.textDetails}>Supervisor: <Text style={styles.italilit}>Joshua Klein</Text></Text>  */}
     <Text style={styles.textDetails}>Notes: <Text style={styles.italilit}></Text></Text>
     </View>
     
     {/* <View style={styles.textDetails}>
      
       <Text style={styles.totalractitle}>
       Highest RAC </Text>
       
       <Text>
       LOW </Text>
       
     </View> */}
     <View >
     <Image 
    style={{width: '3.5cm'}}
        src={icon}
      ></Image>
     </View>
     
    
     </View>
      
    
    <View style={styles.section}>
      </View>
      <View style={styles.section15}></View>
      <View style={styles.jhatable}>
      <View style={styles.raccellspacer}>
        <SignOff></SignOff>
      </View>
      <View style={styles.raccellspacer1}>
      <RACTable></RACTable>
      </View>
        </View>
      
    
   
    <View style={styles.section15}></View>
    <View>
      {/* <JHAHeader rows={[
        {text: "Task", pos :1},
        {text: "Hazards", pos :1},
        {text: "Controls", pos :2},
      ]}></JHAHeader> */}
      {console.log("PDF JHA data", JHA)}
      {JHA.selected.map( (selected_i, i) => {
        console.log(selected_i)
      // return <JHARow key={i} rows={[
      //   {text: selected_i.data.Task, pos :1},
      //   {text: selected_i.data.Hazards, pos :1},
      //   {text: selected_i.data.Controls, pos :2},
      // ]}></JHARow>
      return <JHAHazardRow rac={selected_i.data.rac} task={selected_i.data.task} hazards={selected_i.data.hazards} control={selected_i.data.controls}></JHAHazardRow>
      
      })
    }
      </View> 

      <View style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        
        <View style={styles.jhatable}>
<View>
         {/* <Text>prepared at yourjha.com</Text> */}
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