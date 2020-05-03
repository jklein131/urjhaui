/* pdf stuff */ 
import React , { Component} from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font} from '@react-pdf/renderer';

import icon from '../assets/images/logo-icon.png';

import ReactHtmlParser from 'react-html-parser';

import { makeStyles} from '@material-ui/core/styles';

import roboto_italic from '../assets/fonts/roboto/Roboto-ThinItalic.ttf'
import roboto_thin from '../assets/fonts/roboto/Roboto-Thin.ttf'
import roboto_reg from '../assets/fonts/roboto/Roboto-Regular.ttf'
import roboto_light from '../assets/fonts/roboto/Roboto-Light.ttf'
import roboto_condensed from '../assets/fonts/roboto/RobotoCondensed-Regular.ttf'
import roboto_condensed_Light from '../assets/fonts/roboto/RobotoCondensed-Light.ttf'

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
  jhacell: {
    flex : 1,
    flexGrow: 1,
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
  checkboxs: {
    
  },
});

const FormHeader = () => (
  <View style={styles.jhatable}>
  <Text style={styles.jhacellheader}>Label</Text>
  <Text style={styles.jhacellheader}>Value</Text>
  </View>
);

const JHARow = ({rows}) => (
  <View style={styles.jhatable} wrap={false}>
    {rows.map((answer, i) => {     
           console.log("Entered"); 
            return (<Text style={styles.jhacell}>{answer} </Text>)
        })}
  </View>
);
const LameRow = ({rows}) => (
  <View style={styles.jhatable} wrap={false}>
    {rows.map((answer, i) => {     
            return answer
        })}
  </View>
);


// Create Document Component
export default function FormDocument ({formName, job , values, template})  {
    return (
  <Document>
    
    <Page size="A4" style={styles.page} wrap >
     <View style={styles.jhatable}>
     <View >
     <Text style={styles.root}>{formName}</Text>
     <Text style={styles.textDetails}>Supervisor: <Text style={styles.italilit}>Joshua Klein</Text></Text>
     <Text style={styles.textDetails}>Job Scope: <Text style={styles.italilit}>PLUMN</Text></Text>
     <Text style={styles.textDetails}>Supervisor: <Text style={styles.italilit}>Joshua Klein</Text></Text>
     <Text style={styles.textDetails}>Notes: <Text style={styles.italilit}>AS per rec of the thing and we have</Text></Text>
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
      <FormHeader></FormHeader>
      { template.map((template_val, i) => 
            {
              if (template_val.type == "textarea") {
                return (
<JHARow rows={[template_val.label,"textarea -" + values.find((val2, i2 ) => (val2.name.includes(template_val.name))).value]}></JHARow>
                )
              } else if (template_val.type == "radio-group") {
                var form_value2 = values.find((val2, i2 ) => (val2.name.includes(template_val.name)))
                if (form_value2 === undefined) {
                  return 
                }
                var label_obj = template_val.values.find((val3, i2 ) => (val3.value == form_value2.value))
                if (label_obj === undefined) {
                  return 
                }
                return (
                <JHARow rows={[template_val.label, label_obj.label]}></JHARow>
                  )
              } else if (template_val.type == "select") {
                var form_value2 = values.find((val2, i2 ) => (val2.name.includes(template_val.name)))
                if (form_value2 === undefined) {
                  return 
                }
                var label_obj = template_val.values.find((val3, i2 ) => (val3.value == form_value2.value))
                if (label_obj === undefined) {
                  return 
                }
                return (
                <JHARow rows={[template_val.label, label_obj.label]}></JHARow>
                  )

              } else if (template_val.type == "hidden") {
                //don't show
              } else if (template_val.type == "checkbox-group") {
                //don't show
                var form_value2 = values.map((val2, i2 ) => { if (val2.name.includes(template_val.name)) {
                  return template_val.values.map((val3, i2 ) => {if (val2.value === val3.value) {
                    return (
                    <Text style={styles.checkboxs}>- {val3.label}</Text>
                    )
                } })

              }});
                return (
                <LameRow rows={[<Text style={styles.jhacell}>{template_val.label}</Text>, <View style={styles.jhacell}>{form_value2}</View>]}></LameRow>
                  )
                } else if (template_val.type == "file") {
                  //also don't show
               } else if (template_val.type == "paragraph") {
                 return (
                  
                  <JHARow rows={[ReactHtmlParser(template_val.label,{
                    "transform": (node, index) => {
                      console.log(node)
                      if (node.type === 'tag' && node.name === 'br') {
                        return null;
                      }
                      if (node.type === 'tag' && node.name === 'div') {
                        return <Text>{node.children.map((node, i)=> (node.type === 'text' ? <Text>{node.data}</Text>: null ))}</Text>;
                        // TODO make these nodes handle BR objects probably in the children as newlines. That also probs required getting rid of the JHARows 
                        // cause that class kind of sucks 
                      }
                      
                    }
                  })]}></JHARow>
                 )
                //also don't show 
              } else {
                var form_value = values.find((val2, i2 ) => (val2.name.includes(template_val.name)))
                if (form_value === undefined) {
                    return 
                }
                return (
<JHARow rows={[template_val.label, form_value.value]}></JHARow>
                )
              }
            }
        )}

      
      

      </View> 

      <View style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        
        <View style={styles.jhatable}>
<View>
         <Text>Prepared by Pan-Pacific Mechanical at yourjha.com</Text>
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