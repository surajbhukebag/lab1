import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import text from './../images/1.svg';
import logo from './../images/2.svg';
import Item from './Item';

export default class HomeMain extends React.Component {

  render() {
    return (
      <div className="pt-5">       
       <p className="text-left"><strong>Home</strong></p>
       <br/>
       <p className="text-left">Starred</p>
       <div><hr/>
       <Item type="folder"/>
       <Item type="file"/>
       <Item type="folder"/>
       <br/>
       <p className="text-left">Recent</p>
       <hr/>
       <Item type="file"/>
       <Item type="folder"/>
       <Item type="file"/>
        <Item type="file"/>
        <Item type="file"/>
       <br/>
       </div>
      </div>
    );
  }
}