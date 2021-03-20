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
  Category: "Duct Work",
Controls: " Wear cut-resistant gloves when working with hanger materials. \nUse vise to hold materials during cutting. \nFile sharp edges of strut.\nPaint to identify ends of straps. \nUse proper eye protection while punching metal decking. ",
Hazards: " Lacerations\nProtruding objects\nFlying particles & debris",
Id: 169,
RAC: " L",
Section: "Install Duct",
Task: "Punch and dimple decking for strapping",
}},{"data":{
  Category: "Duct Work",
Controls: " Wear cut-resistant gloves when working with hanger materials. \nUse vise to hold materials during cutting. \nFile sharp edges of strut.\nPaint to identify ends of straps. \nUse proper eye protection while punching metal decking. ",
Hazards: " Lacerations\nProtruding objects\nFlying particles & debris",
Id: 169,
RAC: " L",
Section: "Install Duct",
Task: "Punch and dimple decking for strapping",
}}],
}
export default function Inspections ()  {
    const [body, setBody] = React.useState("hi")
    return (
      <div>
      <Button onClick={() => { setBody(<PDFViewer width="100%" height="1000px"><MyDocument JHA={JHA}>hi</MyDocument></PDFViewer>) }}>hi</Button>
      {body}
      </div>
    ); 
    
}
 