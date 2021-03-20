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
import { BlockPicker } from 'react-color';
import ResponsiveDialog from './Profile'

 
//   <ul className="header">
//             <li><NavLink exact to="/">Home</NavLink></li>
//             <li><NavLink to="/stuff">Stuff</NavLink></li>
//             <li><NavLink to="/contact">Contact</NavLink></li>
//         </ul>

const styles = makeStyles((theme) => ({
  button: {
    // background: theme.palette.secondary.main,
    // color: theme.palette.text.primary,
  },
}))

 function FadeMenu({user, signOut, color, setColor, setProfile}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button color={"default"} variant="contained"  aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
      {user.displayName}
      </Button>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <ResponsiveDialog color={color} setProfile={setProfile} setColor={setColor} forceOpen={false} click={handleClose}></ResponsiveDialog>
        <MenuItem key={"logoug"} onClick={()=>{handleClose(); signOut()}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}


class Navigation extends Component {
  state = {
    forms: [],
  }
  componentDidMount() {
    environment.fetch( 'formtemplates')
    .then(res => res.json())
    .then((data) => {
      this.setState({ forms: data })
    }).catch((err) => (console.log("error",err)))
  }
  render() {
    const {
      user,
      classes, children, className, signOut, ...other
    } = this.props;
    return (
      
<Navbar style={{
  background: this.props.theme.palette.primary.main,
  color: this.props.theme.palette.text.primary,
}} expand="lg" variant="dark">
  <Navbar.Brand href="#">YourJHA</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto navbar-right">
      <Nav.Link href="#jha-dashboard">JHA</Nav.Link>
      <Nav.Link href="#dashboard">Analytics</Nav.Link>
      {/* <Nav.Link href="#inspections">Daily Inspections</Nav.Link>
      <Nav.Link href="#incidents">Incident Reporting</Nav.Link> */}
      {/* <Nav.Link href="#timeline">Social Feed</Nav.Link> */}
      <Nav.Link href="#admin/jobs">Job Manager</Nav.Link>
      <NavDropdown title="Forms" id="basic-nav-dropdown">
      {(this.state.forms.length === 0 ) ? <NavDropdown.Item key={"create new"} href={"#form-builder/create"}>Create new...</NavDropdown.Item>: this.state.forms.map((form) => (
        <NavDropdown.Item key={"jasfkljasf"+form._id} href={"#form-dashboard/"+form._id}>{form.name}</NavDropdown.Item>
      ))}
                     
        <NavDropdown.Divider />
        <NavDropdown.Item key={"formbuilder"} href="#form-builder">Form Builder</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
    <FadeMenu {...this.other} color={this.props.color} setProfile={this.props.setProfile} setColor={this.props.setColor} user={user} signOut={signOut}>
      </FadeMenu>
  </Navbar.Collapse>
</Navbar>
    );
  }
}
 
export default Navigation;