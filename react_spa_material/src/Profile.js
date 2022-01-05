import React, { Component } from "react";
import { environment } from "./enviroments/enviroment"; 
// import {
//     NavLink, 
//   } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';


import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import { withStyles,makeStyles, createTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Input } from "@material-ui/core";
import { BlockPicker, CirclePicker } from 'react-color';

import * as firebase from 'firebase/app';
import 'firebase/auth';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default function ResponsiveDialog({click, color, setColor, forceOpen, setProfile}) {
    const [open, setOpen] = React.useState(open);
    const [isLoading, setIsLoading] = React.useState(true);
    const dname = firebase.auth().currentUser.displayName;
    const [displayName, setDisplayName] = React.useState(dname);
    const [focus, setFocus] = React.useState(false);
    const [profile, setLocalProfile] = React.useState(undefined);
    const [localColor, setLocalColor] = React.useState(color)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => { 
      setOpen(true);
    };

    React.useEffect(() => {
        environment.fetch('profile').then((res)=>(res.json())).then((data)=> {
             if ('error' in data ) {
              if (data["error"] == "auth/id-token-expired") {
                console.log("SIGNOUT")
                return 
              }
             }
             if ('error' in data ) {
              if (data["error"] == "auth/email-not-verified") {
                firebase.auth().currentUser.sendEmailVerification()
                console.log("Verify Email")
                return
              }
             }
            if ('_id' in data) {
              setProfile(data)
                setColor(data.customerId.color)
                setIsLoading(false)
                setLocalColor(data.customerId.color)
                setDisplayName(data.displayName)
            } else {
                setLocalProfile(data)
                setIsLoading(false)
            }
        }).catch((err)=> {
          setLocalProfile(undefined)
                setIsLoading(false)
          console.log(err)
        })
    },[])
  
    const handleClose = (save) => {
        return () => {if (save) {
            
            if (profile !== undefined && '_id' in profile) {
                var body = {
                    _id : profile._id,
                    displayName: displayName, 
                    companyColor: color,
                }
                environment.fetch('profile', {
                    method: 'PATCH',
                    body: JSON.stringify(body),
                    headers: {
                      'Accept': 'application/json',
                      "content-type": "application/json",
                    }
                  }
                  ).then((res) => res.json()).then((data)=> {
                    setOpen(false); setProfile(data);
                  })
            } else {
                var body = {
                    displayName: displayName, 
                    companyColor: color, 
                }
                environment.fetch('profile', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                      'Accept': 'application/json',
                      "content-type": "application/json",
                    }
                  }
                  ).then((res) => res.json()).then((data)=> {
                    setOpen(false); setProfile(data);
                  })
            }
        } else {
            setOpen(false)
            setColor(localColor)
        }
    }
    };
  
    const handleChangeComplete = (color) => {
        setColor(color.hex)
    }
  
    return (
        isLoading ? <div></div>:
      <div>
     {forceOpen ? <div></div> :
        <MenuItem key={"profileg"} onClick={() => {click(); handleClickOpen()} }>Profile</MenuItem>
        }
        <Dialog
          fullScreen={fullScreen}
          open={open || forceOpen}
          onClose={handleClose(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Edit Your Profile"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField id="outlined-basic" label="Display Name" variant="outlined"  value={displayName} onChange={(event) => setDisplayName(event.target.value)}/>
            <br></br>
            <br></br>

            <BlockPicker  
            triangle={"hide"}
            color={ color }
            colors={['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8', '#0F3656']}
            onChangeComplete={ handleChangeComplete }
            ></BlockPicker >
            {/* <TextField id="outlined-basic" label="Company Color" variant="outlined" /> */}
            
          </DialogContent>
          <DialogActions>
            {forceOpen ? <div></div>:<Button onClick={handleClose(false)} color="primary">
              Discard
            </Button>}
            <Button onClick={handleClose(true)} color="primary">
              Save
            </Button>
            <Button onClick={()=>firebase.auth().signOut()} color="primary">
              SignOut
            </Button>
          </DialogActions>
        </Dialog>
      </div> 
    );
  }
  