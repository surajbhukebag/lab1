import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import text from './../images/1.svg';
import logo from './../images/2.svg';

export default class HomeLeftNav extends React.Component {

  render() {
    return (
      <div className="pt-5">       
        <div><img  src={logo} alt="fireSpot"/></div><br/><br/>
        <Nav vertical>
          <NavItem>
            <NavLink href="home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="files">Files</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Sharing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Group</NavLink>
          </NavItem>
        </Nav>       
      </div>
    );
  }
}