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
window.jQuery = $;
window.$ = $;

//this stupid theme thing
const theme = createMuiTheme({ });
  
const useStyles = {
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
  };


class RowControl extends React.Component {
    state = {
        chip: this.props.chip,
        data: this.props.data,
        status : 0,  
    }
    render() {
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
            <div key={this.state.data.Id} id={this.state.data.Id} ref={ref}>
            <JhaRow key={this.state.data.Id} status={this.state.status } setStatus={(stats)=>{this.setState({status: stats}); this.props.updateStatus(stats)}}
            chip={this.state.chip} data={this.state.data} scrollToNext={scrollToNext(ref)}>
            </JhaRow>
            </div>
        )
    }
}
  
 class JhaControl extends React.Component {
    state = {
        sections: {},
        rows: undefined,
        statuss: {},
    }
    componentWillMount() {
        const swag = this.props.dataset.map((object, index) => {
            if (!( object.Section in this.state.sections)) {
                
                this.setState(function(prevState, props){
                    return {sections: {...prevState.sections, [object.Section] :false}}
                 }); 
                 
            }
            return this.setState(function(prevState, props){
                return {statuss: {...prevState.statuss, [object.Id] :0}}
             });
        })
       
            this.setState({rows: this.props.dataset.map((object, index) => {
                
                return <RowControl data={object} chip={object.Section} status={this.state.statuss} updateStatus={ (stat) => {
                   
                            this.setState(function(prevState, props){
                                return {statuss: {...prevState.statuss, [object.Id] :stat}}
                            })
                            console.log(this.state.statuss)
                    }
                }></RowControl>
            })})
        
    }
    
    render() {
        const { classes } = this.props;
        // const [open, opener] = React.useState(0)
        var states ={}
        var length_of_rows = 0 
    return (
        <div key={"main1"}>
        {/*https://github.com/yahoo/react-stickynode */}
        {/* <Sticky innerZ={2000}> */}
           
        {
        states = this.state.rows.map((row, index) => {
            if (this.state.sections[row.props.chip] === true) {
                length_of_rows++
                return row
            }
            if (row.props.data.Id in this.state.statuss && (this.state.statuss[row.props.data.Id] === 1 || this.state.statuss[row.props.data.Id] === 3)) {
                length_of_rows++
                return row 
            }
            return null;
        })
        }
        {
            length_of_rows > 0 ? "": <CustomizedSnackbars></CustomizedSnackbars>
            
              }
              {length_of_rows = 0 ? "" : ""}
              <br></br>

        <div key={"main2"}></div> {/* this is required for the next scroller lol */}
        <Box key={"main3"} zIndex="modal">
             <Paper elevation={5} className={classes.chips}>
                
                {
                    Object.keys(this.state.sections).map((chip) => {
            return <Chip
                        key={chip}
            avatar={<Avatar>{chip[0].toUpperCase()+ chip[1].toUpperCase()}</Avatar>}
            label={chip}
            onClick={() => {
                console.info(chip)
                var r = this.state.sections
                r[chip] = !r[chip]
                this.setState(function(prevState, props){
                    return {sections: {...prevState.sections, [chip] :prevState.sections[chip]}}
                 });
                console.log(this.state.sections)
            }}
    
            color="primary"
            variant={ this.state.sections[chip] ? "default":"outlined"}
        /> })
                }
                
         </Paper>
         </Box>
         <br key={12477}></br>
         <br key={12478}></br>
        </div>
    )
    }
}

export default withStyles(useStyles) (JhaControl);