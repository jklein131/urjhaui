import React, { Component, useState, useEffect,useRef} from "react";
import { Typography,Checkbox, LinearProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import Button from "@material-ui/core/Button";
import Collapse from '@material-ui/core/Collapse';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles, makeStyles,createTheme } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReplayIcon from '@material-ui/icons/Replay';
import Zoom from '@material-ui/core/Zoom';
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import JhaEditModal from '../JhaEditModal'
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import JhaRacSelect from './JhaRacSelect';
import { environment } from "../enviroments/enviroment";
import Jha from "../Jha";
//styles
const useStyles = makeStyles(theme => ({
   rroot: { 
     flexGrow: 1, 
   },
    navroot: {
      backgroundColor: theme.palette.background.paper,
      flexGrow: 0,
    },
    root: {
      width: '100%',
    },
    tabroot: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 500,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    padding: {
      padding: theme.spacing(0, 2),
    }, 
    column: {
        display: "flex",
        flexBasis: '25%',
        alignItems: "center",
      },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '50%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      padding: "auto",
      margin: "auto",
      verticalAlign: "middle",
    },
    tabbody: {
        whiteSpace: "pre-wrap",
    },
    tablabel: {
        whiteSpace: "pre-wrap",
        marginBottom: 0,
    },

  iconSpacing: {
    width: 42,
    minWidth:42,
    height: 42,
    alignItems:"center",
    justifyContent: "center",
    display: "flex",
},
info: {
  fontSize: "3em",
},
card: {
  marginBottom: 15,
},
open: {
  marginBottom: 15,
},
done: {
  marginBottom: 15,
},
checkMarkIcon: {
  marginRight: 15,
  color: theme.palette.success.main,
},
clear: {
  marginBottom: 15,
  opacity: 0.38,
},
titlegrid: {
  alignItems:"center",
  // justifyContent: "center",
  display: "flex",
},
aireason: {
  marginLeft: 'auto',
  marginRight: 5,
  color: theme.palette.text.secondary,
},
controls: {
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
},
twoThings : {
  display:"flex",
  justifyContent: "space-between", 
  alignItems: "center",
}

  }));
  const defaultTheme = createTheme();
  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      fontSize: "1em",
      backgroundColor: defaultTheme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: defaultTheme.shadows[1],
    }
  })(Tooltip); 

export default function JhaRow({goUp, setJHA, isView = false, JHA, showDown, showUp, goDown, jha_type, isCart, data, scrollToNext,status,setStatus, myData, setMyData, sections}) {
    const classes = useStyles()
    // Scrolls are done here 
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const open = status
    const opener = setStatus
    const [confirmAdd, setconfirmAdd] = React.useState(false);

    // if a cart, this is a non-op
    if (!scrollToNext) {
      scrollToNext = (ref1, ref2)=>{}
    }

    const addToJHA = (ref1, ref2)=> {
      // search for JHA and make sure that the cart only contains one type 
      // of hazard
      // scroll to next needs to happen first since like it does calculations. 
      
      if(opener(1)) {
        
      }
    }
    


    const canAddToCart = JHA.type === undefined || (JHA.type !== undefined && JHA.type === jha_type)
    var thisType = ""
    var thatType = ""
    if (JHA.type !== undefined) {
      if (JHA.type === "jha") {
        thisType = "JHA"
        thatType = "PHA"
      } else { 
        thisType = "PHA"
        thatType = "JHA"
      }
    }
    

    const handleConfirmOpen = () => {
      setconfirmAdd(true);
    };
  
    const handleConfirmClose = () => {
      setconfirmAdd(false);
    };
    
    //State list 
    // 0 is no state 
    // 1 is added 
    // 2 is hidden/not added 
    // 3 is added (with controls shown)


    
    const card = <Card key={data._id} className={
      (open === 0) ? classes.open : (open === 1) ?
          classes.done: (open === 2) ? classes.clear : (open === 3) ? classes.open : {}
       }>
     
   <CardContent key={12412412415}>
   
   <Grid container spacing={isCart || isView? 0 : 2}>
   <Grid  item xs={12} sm={4} className={classes.titlegrid}>
     
          {/* <FormControlLabel
         aria-label="Atmospheric Testing"
         onClick={(event) => event.stopPropagation()}
         onFocus={(event) => event.stopPropagation()}
         control={<Checkbox />}
         label={<b>Atmospheric Testing</b>}
         className={classes.tablabel}
       /> */}
       {(open === 1 || open === 3) ? <CheckCircleIcon
       className={classes.checkMarkIcon}></CheckCircleIcon> : ""}
       <Typography variant="h5" component="h4"> {data.task}</Typography>
       </Grid>
     
       <Grid item xs={12} sm={8} >
       <div className={classes.twoThings}>
       <FormControlLabel
         aria-label={data.hazards.trim().split("\n").join(", ")}
         control={ (open !== 2) ? <BlueOnGreenTooltip className={classes.info} title="Hazards are potential incidents that might occur on the jobsite. " placement="top-start"><div className={classes.iconSpacing}>
           <ReportProblemOutlinedIcon color="secondary">
           </ReportProblemOutlinedIcon></div></BlueOnGreenTooltip>:  <ReportProblemOutlinedIcon color="secondary">
           </ReportProblemOutlinedIcon>}
         label={data.hazards.trim().split("\n").join(", ")}
         className={classes.tablabel}
       />
       <div>
       <div className={classes.twoThings}>
       <JhaRacSelect RAC={data.rac} disabled={isView} setRAC={(value)=>{
           /* since we have an effect on the dataset variable, we only need 
           to set the new dataset with the correct values, and everything else should 
           update 
           */
          console.log("RAC CHANGED", data._id, value)
          var uploadPayload = {rac: value, _id: data._id} 
          var et = ""
          if (jha_type === "positions") {
             et="/positions"
          }
          environment.fetch('hazards/'+et+data._id,
          {
            method: 'PATCH',
            body: JSON.stringify(uploadPayload),
            headers: {
              'Accept': 'application/json',
              "content-type": "application/json",
            }
          }).then(res => 
            res.json()).then((activitiesC) => {
             setMyData(
               myData.map((v, index)=> {
                    if (v._id === data._id) {
                        var k = v 
                        k.rac = value
                      return k
                    }
                    return v
               })
             )
            }).catch(function(reason) {
             alert(reason)
          });
          
       }}></JhaRacSelect>
       {isCart || isView? <React.Fragment></React.Fragment> :
       <Zoom in={open===1 || open===3}>
         {(open === 1) ? 
          <BlueOnGreenTooltip className={classes.info} 
          title="Show Control" placement="top-start">
<IconButton aria-label="delete" onClick={()=> {console.log("hi"); opener(3)}}><KeyboardArrowDownIcon ></KeyboardArrowDownIcon></IconButton>
</BlueOnGreenTooltip>
         : open === 3 ?
         <BlueOnGreenTooltip className={classes.info} 
         title="Hide Control" placement="top-start">
           <IconButton aria-label="delete" onClick={()=> {console.log("hi"); opener(1)}}><KeyboardArrowUpIcon ></KeyboardArrowUpIcon></IconButton>
         </BlueOnGreenTooltip>

        : <div></div> }</Zoom>
         }
        {
          // if it's a cart hide the undo icon.
         isCart || isView ? <React.Fragment></React.Fragment> : <Zoom in={(open===1 || open === 3 || open === 2)}>
         <BlueOnGreenTooltip className={classes.info} 
           title="Undo Selection " placement="top-start">
         <IconButton aria-label="delete" onClick={()=> {
            console.log("hi"); opener(0);
           }}><ReplayIcon ></ReplayIcon></IconButton>
         </BlueOnGreenTooltip>
          </Zoom>
        }
       
        </div>
        </div>
       
        </div>

       </Grid>
       </Grid><div ref={ref1}>
       <Collapse in={open === 0 || open ===3 || isCart}>
     
         <Typography component="span" className={classes.controls}>
           <b>Controls: </b>
         {
   data.controls.split("\\n").map((obj,i)=> (
       <Typography key={obj}>{obj}</Typography>
   ))
                   }

         </Typography> 
         </Collapse>
         </div>
   </CardContent>
   <Collapse in={open === 0 || isCart || isView}>
   <CardActions disableSpacing ref={ref2}>
       {/* this is tricky to scroll, we need to report our height so that we can get the height of the next JHA object to scroll to it's button.*/}
     {!isCart && !isView
     ? <React.Fragment> <Button size="small" 
     onClick={()=> {
       if (canAddToCart) {
        console.log("hi"); scrollToNext(ref1, ref2); addToJHA(ref1, ref2);
       } else {
        handleConfirmOpen();
       }
       
      }}
     color="primary" 
     variant="contained">Add</Button> 
     <Dialog
          open={confirmAdd}
          onClose={handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Would you like to clear your progress?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are currently in the process of creating a {thisType}. The element you've selected is of type {thatType}. Adding this to the cart will remove your other selected tasks. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
              Keep My Current {thisType}
            </Button>
            <Button onClick={()=>{ scrollToNext(ref1, ref2);addToJHA(ref1, ref2); handleConfirmClose();} } variant={"contained"} color="primary" autoFocus>
              Add and Create new {thatType}
            </Button>
          </DialogActions>
        </Dialog>
     </React.Fragment>
    

     : <React.Fragment></React.Fragment>
     
     }
     
                   &nbsp;
 {
   isView? <React.Fragment></React.Fragment>:
 
     <JhaEditModal jha_type={jha_type} sections={sections} hazard={data} renderbutton={(r)=> (
     <Button size="small" onClick={r} color="primary" variant="contained">Edit</Button>)}
     
     setHazard={(newHazard)=>{
       // on new hazard, if
       setMyData(myData.map((d)=> (d._id === newHazard._id ?newHazard: d )))
       opener(1);
     }}></JhaEditModal>}

     {isView ? <React.Fragment></React.Fragment> :<Button size="small" onClick={()=> {console.log("hi");  scrollToNext(ref1, ref2);opener(2);}}>{isCart ? "Delete": "Hide"}</Button>}
     <InfoOutlinedIcon className={classes.aireason}></InfoOutlinedIcon>
     <Typography color="textSecondary">{data.section}</Typography> {/* Recomended on similar activities */}
     
   </CardActions>
   </Collapse>
 </Card>
    return (
      <div key={"card"+data._id}>
        {isCart ? <Grid container spacing={0}>
        <Grid  item xs={1} sm={1}>
            <Grid container spacing={0}>
            <Grid  item xs={12} ><IconButton disabled={!showUp} aria-label="delete" onClick={goUp}><KeyboardArrowUpIcon ></KeyboardArrowUpIcon></IconButton></Grid>
            <Grid  item xs={12} ><IconButton disabled={!showDown} aria-label="delete" onClick={goDown}><KeyboardArrowDownIcon ></KeyboardArrowDownIcon></IconButton></Grid>
            </Grid>
          </Grid>
          <Grid  item xs={11} sm={11}>
            {card} 
          </Grid>
          
        </Grid>
        :card }
    </div>

  //   <ExpansionPanel defaultExpanded> 
  //           <ExpansionPanelSummary
  //             expandIcon={<ExpandMoreIcon />}
  //             aria-controls="panel4bh-content"
  //             id="panel4bh-header"
  //           >
  //       <div className={classes.column}>
  //       <FormControlLabel
  //           aria-label="Acknowledge"
  //           onClick={(event) => event.stopPropagation()}
  //           onFocus={(event) => event.stopPropagation()}
  //           control={<Checkbox />}
  //           label="Atmospheric Testing"
  //           className={classes.tablabel}
  //         />
  //         </div>
  //         <div className={classes.column}>
  //           <Typography className={classes.secondaryHeading}>Atmospheric Hazards</Typography>
  //         </div>
                
  //           </ExpansionPanelSummary>
  //           <ExpansionPanelDetails>
  //             <Typography className={classes.tabbody}>
  //                 {
  // "Oxygen content shall be tested. The acceptable range is 19.5 to 23.5 percent.\\nTest for combustible gas and vapors. Ensure that you are within the Explosion Limits. Record readings on the Entry Permit.\\nSafe operating levels can be determined from the Permissible Exposure Level (PEL) as listed in OSHA 29 CFR 1910.1000.handle".split("\\n").map((obj,i)=> (
  //     <Typography>{obj}</Typography>
  // ))

           
  //                 }
  //              </Typography>
  //           </ExpansionPanelDetails>
  //         </ExpansionPanel>
    )
}