import React, { Component } from "react";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

export default function Library({profile}) {
    React.useEffect(()=>{
      if (profile != undefined) {
        firebase.storage().ref("library").listAll(). then((res) => {
          console.log(res)
          setFiles(res.items)
          res.items[0].getDownloadURL()
         })
      }
    },[profile])
    const [files, setFiles] = React.useState([]);
    return (
      <div>
        <h2>Library Resources</h2>
        <p></p>

        <ol>
        {files.map((item)=> <a href="#/library" onClick={()=>item.getDownloadURL().then((snapshot)=>window.open(snapshot))}><li>{item.name}</li></a> )}
        </ol>


      <br></br>
      <br></br>
      {/* <JhaControl dataset={myData}>
      </JhaControl> */}
      </div>
    );
}
 