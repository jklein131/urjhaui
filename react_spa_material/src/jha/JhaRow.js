import React, { Component, useState, useEffect,useRef} from "react";
import { Typography,Checkbox } from "@material-ui/core";
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
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles, makeStyles,createMuiTheme } from '@material-ui/core/styles';
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
//styles
const useStyles = makeStyles(theme => ({
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
  const defaultTheme = createMuiTheme();
  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      fontSize: "1em",
      backgroundColor: defaultTheme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: defaultTheme.shadows[1],
    }
  })(Tooltip); 
  
export default function JhaRow({data, scrollToNext,status,setStatus, JHA, setJHA, myData, setMyData, sections}) {
    const classes = useStyles()
    const open = status
    const opener = setStatus

    
    //State list 
    // 0 is no state 
    // 1 is added 
    // 2 is hidden/not added 
    // 3 is added (with controls shown)


    // Scrolls are done here 
    const ref1 = useRef(null)
    const ref2 = useRef(null)

    return (
      <div>
      <Card key={data._id} className={
         (open === 0) ? classes.open : (open === 1) ?
             classes.done: (open === 2) ? classes.clear : (open === 3) ? classes.open : {}
          }>
        
      <CardContent key={12412412415}>
      <Grid container spacing={3}>
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
          <JhaRacSelect RAC={data.rac} setRAC={(value)=>{
              /* since we have an effect on the dataset variable, we only need 
              to set the new dataset with the correct values, and everything else should 
              update 
              */
             console.log("RAC CHANGED", data._id, value)
             var uploadPayload = {rac: value, _id: data._id} 
             environment.fetch('hazards/'+data._id,
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
               })
             
          }}></JhaRacSelect>
          
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
          <Zoom in={open===1 || open === 3 || open === 2}>
          <BlueOnGreenTooltip className={classes.info} 
            title="Undo Selection " placement="top-start">
          <IconButton aria-label="delete" onClick={()=> {console.log("hi"); opener(0)}}><ReplayIcon ></ReplayIcon></IconButton>
          </BlueOnGreenTooltip>
           </Zoom>
           </div>
           </div>
          
           </div>

          </Grid>
          </Grid><div ref={ref1}>
          <Collapse in={open === 0 || open ===3}>
        
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
      <Collapse in={open === 0}>
      <CardActions disableSpacing ref={ref2}>
          {/* this is tricky to scroll, we need to report our height so that we can get the height of the next JHA object to scroll to it's button.*/}
        <Button size="small" onClick={()=> {console.log("hi");  scrollToNext(ref1, ref2);opener(1);}} color="primary" variant="contained">Add</Button>
        
                      &nbsp;

        <JhaEditModal sections={sections} hazard={data} renderbutton={(r)=> (
        <Button size="small" onClick={r} color="primary" variant="contained">Edit</Button>)}
        
        setHazard={(newHazard)=>{
          // on new hazard, if
          opener(1);
          setMyData(myData.map((d)=> (d._id === newHazard._id ?newHazard: d )))
        }}></JhaEditModal>

        <Button size="small" onClick={()=> {console.log("hi");  scrollToNext(ref1, ref2);opener(2);}}>Hide</Button>
        <InfoOutlinedIcon className={classes.aireason}></InfoOutlinedIcon>
        <Typography color="textSecondary">{data.section}</Typography> {/* Recomended on similar activities */}
        
      </CardActions>
      </Collapse>
    </Card>
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