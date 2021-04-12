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
            <div key={data.Id} id={data.Id} ref={ref}>
            <JhaRow key={data.Id} status={status.status} setStatus={(stats)=>{updateStatus(stats)}}
            chip={chip} data={data} scrollToNext={scrollToNext(ref)} myData={myData} 
            setMyData={setMyData} setJHA={setJHA} JHA={JHA} sections={sections}>
            </JhaRow>
            </div>
        )
    
}
  
function JhaControl({myData , setJHA, JHA, setMyData, profile }) {
   
    const classes = useStyles();
    const [sections, setSections] = React.useState({})
    const [rows, setRows] = React.useState([])
    const [statuss, setStatuss]= React.useState({})

    const reducer = (accumulator, currentValue) => {
        if ("section" in accumulator) {
            // this is the first case, where the key is in the object
            // so we should return our first array as the acculmator 
            return {
                [accumulator.section]: false, 
            }
        }
        return {...accumulator,[currentValue.section]:false  }
    };

    useEffect(()=> {
        console.log("rrr",myData.reduce(reducer))
            setSections(myData.reduce(reducer)); 
    },[myData])

    useEffect(()=> {
        var rp = {}
        if (myData === false) {
            return
        }
        if (JHA.selected !== undefined)
            {
                console.log("RP",JHA)
                JHA.selected.map((v)=> (
                rp[v.data.Id] = v
                ));
            console.log(rp)
        }
        setStatuss(
            function(statuss, props){
                var tmp = statuss
                myData.map((object, index) => {
                    if (object.Id in rp) {
                        tmp[object.Id] = {status:rp[object.Id].status, data: object}
                    } else {
                        tmp[object.Id] = {status:0, data: object}
                    }
            })
               return tmp
             })
        //if this is first load, check for the selected data and select it
        //end use effect

        
    },[sections ])
 
    useEffect(()=> {
        console.log("effect1", statuss, myData, sections)
        if (myData  !== false && statuss !== {}) {
        setRows( myData.map((object, index) => {
                return <RowControl key={object.Id} data={object} chip={object.section} status={statuss[object.Id]} updateStatus={ (stat) => {
                    setStatuss(function(statuss, props){
                                return  {...statuss, [object.Id] :{status:stat, data:object}}
                            })
                    }
                } setMyData={setMyData } myData={myData } setJHA={setJHA} JHA={JHA} sections={sections}></RowControl>
            }))}},[statuss]
    )
    //use effect only when the rows object changes
    useEffect(()=> {
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


    var states ={}
    var length_of_rows = 0 
    return (
        <div key={"main1"}>
        {/*https://github.com/yahoo/react-stickynode */}
        {/* <Sticky innerZ={2000}> */}
           
       
        <Box key={"main3"} zIndex="modal">
             <Paper elevation={5} className={classes.chips}>
                
                {
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
        /> })
                }
                
         </Paper>
         </Box>
         <br></br>
         {
        states = rows.map((row, index) => {
            if (sections[row.props.chip] === true) {
                length_of_rows++
                return row
            }
            if (row.props.data.Id in statuss && (statuss[row.props.data.Id].status === 1 || statuss[row.props.data.Id].status === 3)) {
                length_of_rows++
                return row 
            }
            return null;
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