import React, { Component } from "react";
// import {
//     NavLink, 
//   } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

//   <ul className="header">
//             <li><NavLink exact to="/">Home</NavLink></li>
//             <li><NavLink to="/stuff">Stuff</NavLink></li>
//             <li><NavLink to="/contact">Contact</NavLink></li>
//         </ul>

class Navigation extends Component {
  render() {
    return (
<Navbar bg="dark" expand="lg" variant="dark">
  <Navbar.Brand href="#">YourJHA</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto navbar-right">
      <Nav.Link href="#jha">Jha Generator</Nav.Link>
      <Nav.Link href="#dashboard">Analytics Dashboard</Nav.Link>
      <Nav.Link href="#inspections">Daily Inspections</Nav.Link>
      <Nav.Link href="#incidents">Incident Reporting</Nav.Link>
      <Nav.Link href="#admin/jobs">Job Manager</Nav.Link>
      <NavDropdown title="Forms" id="basic-nav-dropdown">
        
        <NavDropdown.Item href="#resources/learning">Form Name</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#form-builder">Form Builder</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
    <Button variant="outline-success" href="#login">Joshua Klein</Button>
  </Navbar.Collapse>
</Navbar>
    );
  }
}
 
export default Navigation;