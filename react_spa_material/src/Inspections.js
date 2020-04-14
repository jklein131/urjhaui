import React, { Component } from "react";
import LoginTab from './LoginForm';
import MyDocument from './JhaDocument'

import {  PDFViewer } from '@react-pdf/renderer';
 
class Inspections extends Component { 
  render() {
    return (
      <div>
        <h2>Inspections</h2>
        <LoginTab></LoginTab>
        <ol> 
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li> 
        </ol>
        <PDFViewer width="100%" height="1000px"><MyDocument /></PDFViewer>
      </div>
      
    ); 
  }
}
 
export default Inspections;