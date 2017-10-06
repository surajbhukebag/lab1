import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import text from './../images/1.svg';
import logo from './../images/2.svg';
import Sigin from './Signin'
import folder from './../images/folder.jpg';
import file from './../images/file.png';
import { Glyphicon } from 'react-bootstrap';

export default class Item extends React.Component {

  render() {
    return (
      <div>
      	{
      		this.props.type === 'file' ?
      		 <p className="text-left">&nbsp;&nbsp; <img  src={file} alt="fireSpot"/> &nbsp;&nbsp;File name&nbsp; <Glyphicon glyph="star" /> </p> :
      		  <p className="text-left">&nbsp;&nbsp; <img  src={folder} alt="fireSpot"/> &nbsp;&nbsp;File name </p>		
      	}
      
       <hr />
      </div>
    );
  }
}