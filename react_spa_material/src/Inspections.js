import React, { Component } from "react";
import MyDocument from './JhaDocument'
import LoginTab from './LoginForm';
import Button from '@material-ui/core/Button';


import {  PDFViewer, BlobProvider,Document, PDFDownloadLink } from '@react-pdf/renderer';

const JHA = {"activity":{"name":"Test Activity"}, 
"jobselect":{"name": "Test Job", 
            "city": "san Diego",
            "street": "san Diego",
             },
"selected":[{"data":{
  category: "Duct Work",
controls: " Wear cut-resistant gloves when working with hanger materials. \nUse vise to hold materials during cutting. \nFile sharp edges of strut.\nPaint to identify ends of straps. \nUse proper eye protection while punching metal decking. ",
hazards: " Lacerations\nProtruding objects\nFlying particles & debris",
Id: 169,
rac: "M",
section: "Install Duct",
task: "Punch and dimple decking for strapping",
}},{"data":{
  category: "Duct Work",
controls: " Wear cut-resistant gloves when working with hanger materials. \nUse vise to hold materials during cutting. \nFile sharp edges of strut.\nPaint to identify ends of straps. \nUse proper eye protection while punching metal decking. ",
hazards: " Lacerations\nProtruding objects\nFlying particles & debris",
Id: 169,
rac: "L",
section: "Install Duct",
task: "Punch and dimple decking for strapping",
}}],
}
const profile = {
  displayName: "Joshua Klein",
  email: "myemail@gmail.com"
}
export default function Inspections ()  {
    const [body, setBody] = React.useState("hi")
    return (
      <div>
      <Button onClick={() => { setBody(<PDFViewer width="100%" height="1000px"><MyDocument JHA={JHA} profile={profile}>hi</MyDocument></PDFViewer>) }}>hi</Button>
      {body}
      </div>
    ); 
    
}
 