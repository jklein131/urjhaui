import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import JhaControl from './jha/JhaControl'
import myData from './assets/data/hazards.json';

class Incidents extends Component {
  
  
  render() {
    const handleDelete = () => {
      console.info('You clicked the delete icon.');
    };
  
    return (
      <div>
        <h2>Incidents</h2>
        <p>Near Miss Reporting is essential for detecting safety stuff</p>
        {/* <ol>
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol> */}


      <br></br>
      <br></br>
      {/* <JhaControl dataset={myData}>
      </JhaControl> */}
      </div>
    );
  }
}
 
export default Incidents;