/* pdf stuff */ 
import React from "react";
import { Page, Text, View, Document, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';


const Heading = styled.Text`
  margin: 15px;
  font-size: 15px;
  font-family: 'Helvetica';
`;



// Create styles
const styles = StyleSheet.create({
  page: {
  //  
    backgroundColor: '#FFFFFF',
    //margin: '15px',
    //display: 'flex',
   // flexWrap: 'wrap',
  },
  section: {
    height: 0,
    flexBasis: '100%',
  },
  jhatable :{
    padding: '0 px 15px 0px 15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jhacellheader : {
    flex : 1,
    margin: '1px',
    textAlign: 'center',
    backgroundColor: "darkgray",
    color: 'white',
  },
  jhacell: {
    flex : 1,
    margin: '1px',
    padding: '2px',
    fontSize: '3.5mm',
    backgroundColor: "lightgray",
  }
});

const JHAHeader = () => (
  <View style={styles.jhatable}>
  <Text style={styles.jhacellheader}>Controls</Text>
  <Text style={styles.jhacellheader}>Hazards</Text>
  <Text style={styles.jhacellheader}>RAC</Text>
  </View>
);

const JHARow = ({rows}) => (
  <View style={styles.jhatable} wrap={false}>
    {rows.map((answer, i) => {     
           console.log("Entered");                 
           // Return the element. Also pass key     
           return (<Text style={styles.jhacell}>{answer} </Text>)
        })}
  </View>
);

// Create Document Component
export default function MyDocument ()  {
    return (
  <Document>
    
    <Page size="A4" style={styles.page} wrap>
    <Text render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    <Heading>Installing overhead pipe</Heading>
    <View style={styles.section}>
    </View>
      <JHAHeader></JHAHeader>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck"]}></JHARow>
      <JHARow rows={["Lifting heavy boxes","Lift using your knees \n lift better \n don't hur yourself ","fuck1"]}></JHARow>
      
    </Page>
  </Document>
    )
    };