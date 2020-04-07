import React, { Component } from "react";
import LoginTab from './LoginForm';
 
class Inspections extends Component { 
  render() {
    return (
      <div>
        <h2>Inspections</h2>
        <p><LoginTab></LoginTab></p>
        <ol> 
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li> 
        </ol>
      </div>
      
    ); 
  }
}
 
export default Inspections;