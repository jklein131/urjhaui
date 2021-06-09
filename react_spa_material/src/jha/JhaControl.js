import React, { Component,useEffect,useState} from "react";
import { Typography,Checkbox } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { positions, zIndex} from '@material-ui/system';
import Collapse from '@material-ui/core/Collapse';
import JhaEditModal from '../JhaEditModal'

import { withStyles, makeStyles,createMuiTheme } from '@material-ui/core/styles';

import JhaRow from './JhaRow'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from './JhaHelp';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Sticky from 'react-stickynode';
import $ from "jquery";
import { relativeTimeRounding } from "moment";
window.jQuery = $;
window.$ = $;

//this stupid theme thing
const theme = createMuiTheme({ });
  
const useStyles = makeStyles({
    chips: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      zIndex: 2000,
      "z-index": 2000,
      '& > *': {
        margin: theme.spacing(0.5),
      },
      padding: 15,
    },
    break :{
        flexBasis: '100%',
        height: 0,
      },
  });


function RowControl({status, chip, data, updateStatus, myData, setMyData, setJHA, JHA, sections}) {

    
        //this is triggered on "add" to scroll to the next object.
        const scrollToNext = (ref) => {
            // reports id of self, 
            return (ref1, ref2) => {
                console.log("lit", $(ref.current).height())
                // ref1=header ref2=controls body or something
                scroll.scrollMore($(ref.current).next().height() - $(ref1.current).height() - $(ref2.current).height(), {
                    duration: 200,
                })
            }
        }
        var ref = React.createRef();
        return (
            <div key={data._id} id={data._id} ref={ref}>
            <JhaRow key={data._id} status={status.status} setStatus={(stats)=>{updateStatus(stats)}}
            chip={chip} data={data} scrollToNext={scrollToNext(ref)} myData={myData} 
            setMyData={setMyData} setJHA={setJHA} JHA={JHA} sections={sections}>
            </JhaRow>
            </div>
        )
    
}
  
function JhaControl({myData , setJHA, JHA, setMyData, profile }) {
   
    const classes = useStyles();
    const [sections, setSections] = React.useState(undefined)
    const [rows, setRows] = React.useState([])
    const [statuss, setStatuss]= React.useState(undefined)

    const reducer = (accumulator, currentValue) => {
        if ("section" in accumulator) {
            // this is the first case, where the key is in the object
            // so we should return our first array as the acculmator 
            // if the sections object already exsists, we should keep the value from it (someone modified myData)
            return {
                [accumulator.section]: sections === undefined ? false :sections[currentValue.section] , 
            }
        }
        return {...accumulator,[currentValue.section]: sections === undefined ? false : sections[currentValue.section]  }
    };

    useEffect(()=> {
        // run reduce the data into the sections headers using the function above
            setSections(myData.reduce(reducer)); 
    },[myData])

    useEffect(()=> {
        var rp = {}
        if (myData === false) {
            return
        }
        setStatuss(
            function(statuss, props){ 
                var tmp = statuss === undefined ? {}: statuss
                myData.map((object, index) => {
                    // fix save the map somewhere so this is not O(n^2)
                    // and is just an index lookup. 
                    // object 
                    var r2 = JHA.selected !== undefined ? JHA.selected.filter((v)=> (
                        v.data._id === object._id
                    )) : []
                    if (r2.length > 0) {
                        tmp[object._id] = {status:r2[0].status, data: object}
                    } else {
                        tmp[object._id] = {status:0, data: object}
                    }
            })
               return tmp
             })
        //if this is first load, check for the selected data and select it
        //end use effect

        
    },[sections])
 
   
    //use effect only when the rows object changes
    useEffect(()=> {
        if (statuss === undefined) {
            return
        }
        setJHA(t =>
            {
            const newMessageObj = { ...t, "selected": Object.keys(statuss).filter((ssf,index) => {
                return statuss[ssf].status === 1 || statuss[ssf].status === 3
            }).map((i)=> {
                return statuss[i]
            }) };
            return newMessageObj 
        })
    }, [statuss])

    useEffect(()=> {
        console.log("effect1", statuss, myData, sections)
        if (sections === undefined) {
            return 
        }
        if (statuss === undefined) {
            return 
        }
        if (myData  !== false ) {

            // tried taking this out of an effect, and iterating through the map in the body of the function, but it's slow af. 
            // I think because it blocks the render thread. But i have no idea. All i know is that the rows have to go in here. Pretty wild. 
            // we might want to add some sort of sorting on the data here, to be able to move it around. 
        setRows( myData.map((object, index) => {
                return <RowControl key={object._id} data={object} chip={object.section} status={statuss[object._id]} updateStatus={ (stat) => {
                    setStatuss(function(statuss, props){
                                return  {...statuss, [object._id] :{status:stat, data:object}}
                            })
                    }
                } setMyData={setMyData } myData={myData } setJHA={setJHA} JHA={JHA} sections={sections}></RowControl>
            }))}},[sections, statuss]
    )
    var states ={}
    var length_of_rows = 0 
    return (
        <div key={"main1"}>
        {/*https://github.com/yahoo/react-stickynode */}
        {/* <Sticky innerZ={2000}> */}
           
       
        <Box key={"main3"} zIndex="modal">
             <Paper elevation={5} className={classes.chips}>
                
                { sections !== undefined ? 
                    Object.keys(sections).map((chip) => {
            return <Chip
                        key={chip}
            avatar={<Avatar>{chip[0].toUpperCase()+ chip[1].toUpperCase()}</Avatar>}
            label={chip}
            onClick={() => {
                console.info(chip)
                var r = sections
                r[chip] = !r[chip]
                setSections(function(ss, props){
                    return  {...ss, [chip] :sections[chip]}
                 });
            }}
    
            color="primary"
            variant={ sections[chip] ? "default":"outlined"}
        /> }) : <div> Loading</div> 
                }
                <div className={classes.break}></div>
                <br></br>
                <br></br>
                <JhaEditModal sections={sections} hazard={{rac: 'L', section: 'General Safety'}} renderbutton={(r)=> (
        <Button size="small" onClick={r} color="primary" variant="contained">Add New Hazard</Button>)}
        
        setHazard={(newHazard)=>{
          // on new hazard, if 
          // Since we know this is a new one, we can cheat and just push it onto the array
          setStatuss(function(statuss, props){
            return  {...statuss, [newHazard._id] :{status:1, data:newHazard}}
        })
          setMyData([...myData, newHazard])
        }}></JhaEditModal>

         </Paper>
         </Box>
         <br></br>
         {
        states = rows.filter((row, index) => {
            if (sections[row.props.chip] === true) {
                length_of_rows++
                return true
            }
            if (row.props.data._id in statuss && (statuss[row.props.data._id].status === 1 || statuss[row.props.data._id].status === 3)) {
                length_of_rows++
                return true 
            }
            return false;
        })
        }
        <div key={"main2"}></div> {/* this is required for the next scroller lol */}
        {
            length_of_rows > 0 ? "": <CustomizedSnackbars key={1241241241555}></CustomizedSnackbars>
            
              }
              {length_of_rows = 0 ? "" : ""}
              <br></br>
         <br key={12477}></br>
        </div>
    )
}

export default (JhaControl);