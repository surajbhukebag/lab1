import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import text from './../images/1.svg';
import logo from './../images/2.svg';
import Item from './Item';

export default class FilesMainHome extends React.Component {

  render() {
    return (
      <div className="pt-5">       
       <p className="text-left">Dropbox</p>
       <br/>
       
       <hr/>
       <Item type="file"/>
       <Item type="folder"/>
       <Item type="file"/>
        <Item type="file"/>
        <Item type="file"/>
       <br/>
      </div>
    );
  }
}