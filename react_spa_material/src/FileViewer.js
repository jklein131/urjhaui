import React, { Component } from "react";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { environment } from "./enviroments/enviroment"; 
import {  PDFViewer, Document } from '@react-pdf/renderer';

export default function FileViewer({match}) {
    var [blobUrl, setBlobUrl] = React.useState("")
    if (match === undefined || match.params["id"] === undefined) {
        return <div><p>404 not found!</p></div>
    }

    console.log("download", match.params["id"])
        firebase.storage().ref(match.params["id"].replace(/%2F/g,"/")).getDownloadURL().then((snapshot) => {
          console.log(snapshot)
          window.location.href = snapshot
          return 
        })
        
    console.log("bloburl", blobUrl)
      
    return blobUrl !== "" ? <PDFViewer width="100%" height="1000px"  >
        <Document file={blobUrl}></Document>
    </PDFViewer> : "asf"
}