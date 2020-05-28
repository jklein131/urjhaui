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

import { withStyles,makeStyles, createMuiTheme} from '@material-ui/core/styles';
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

export default function ResponsiveDialog({click, color, setColor, forceOpen, setProfile}) {
    const [open, setOpen] = React.useState(open);
    const [isLoading, setIsLoading] = React.useState(true);
    const [displayName, setDisplayName] = React.useState(firebase.auth().currentUser.displayName);
    const [focus, setFocus] = React.useState(false);
    const [profile, setLocalProfile] = React.useState(undefined);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };

    React.useEffect(() => {
        environment.fetch('profile').then((res)=>(res.json())).then((data)=> {
            if ('_id' in data) {
                setColor(data.customerId.color)
                setProfile(data)
                setIsLoading(false)
                
            } else {
                setLocalProfile(data)
                setIsLoading(false)
            }
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
                  ).then((res) => res.json()).then((data)=> { setOpen(false); setProfile(data);})
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
                  ).then((res) => res.json()).then((data)=> { setOpen(false); setProfile(data);})
            }
        } else {
            setOpen(false)
        }
      
    }
    };
  
    const handleChangeComplete = (color) => {
        setColor(color.hex)
    }
  
    return (
        isLoading ? <div></div>:
      <div>
     {forceOpen ? "" :
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
            <TextField id="outlined-basic" label="Display Name" variant="outlined" value={displayName} onChange={(val) => setDisplayName(val)}/>
            <br></br>
            <br></br>

            <BlockPicker  
            triangle={"hide"}
            color={ color }
            colors={['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8', '#0F3656']}
            onChangeComplete={ handleChangeComplete }
            ></BlockPicker >
            {/* <TextField id="outlined-basic" label="Company Color" variant="outlined" /> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {forceOpen ? <div></div>:<Button onClick={handleClose(false)} color="primary">
              Discard
            </Button>}
            <Button onClick={handleClose(true)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div> 
    );
  }
  