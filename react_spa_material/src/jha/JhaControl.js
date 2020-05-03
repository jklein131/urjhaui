import React, { Component,useEffect,useState} from "react";
import { Typography,Checkbox } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Collapse from '@material-ui/core/Collapse';

import { withStyles, makeStyles,createMuiTheme } from '@material-ui/core/styles';

import JhaRow from './JhaRow'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky';


const useStyles = makeStyles((theme) => ({
    chips: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));

import $ from "jquery";
window.jQuery = $;
window.$ = $;


  
 class JhaControl extends React.Component {
    state = {
        sections: {},
        rows: undefined,
    }
    componentWillMount() {
        this.props.dataset.map((object, index) => {
            if (!( object.Section in this.state.sections)) {
                this.setState(function(prevState, props){
                    return {sections: {...prevState.sections, [object.Section] :false}}
                 });
            }
        })
        this.setState({rows: this.props.dataset.map((object, index) => {
            
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
                <div id={object.Id} ref={ref}>
                <JhaRow key={index} data={object} scrollToNext={scrollToNext(ref)}></JhaRow>
                </div>
            )
        })})
    }
    
    render() {
        const { classes } = this.props;
        // const [open, opener] = React.useState(0)

    return (
        <div>

            <div className={classes.chips}>
                
            {
                Object.keys(this.state.sections).map((chip) => {
                    console.log("h12",this.state.sections[chip])
        return <Chip
                    key={chip}
        avatar={<Avatar>{chip[0].toUpperCase()+ chip[1].toUpperCase()}</Avatar>}
        label={chip+ this.state.sections[chip]}
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
        variant={ "outlined"}
    /> })
            }
            {Object.keys(this.state.sections).map((key)=> (console.log(this.state.sections,this.state.sections[key])))}
            </div>
    <br>
    </br>
    <br></br>
        {
        this.state.rows
        }
        </div>
    )
    }
}

export default withStyles(useStyles) (JhaControl);