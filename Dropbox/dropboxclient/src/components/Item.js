import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import text from './../images/1.svg';
import logo from './../images/2.svg';
import Sigin from './Signin'
import FileButton from './FileButton'
import folder from './../images/folder.jpg';
import file from './../images/file.png';
import { Glyphicon } from 'react-bootstrap';

export default class Item extends React.Component {

  render() {
    return (
      <div className="container-fluid">
      	{
          this.props.file !== undefined ? 
      		this.props.file.isDirectory ?
            <div className="row" >
              <div className="col-md-10 text-left"> <img  src={folder} alt="folder"/> &nbsp;&nbsp;{this.props.file.name} </div>
              <div className="col-md-2"><FileButton /> </div>
            </div>
      		   :
            <div className="row" >
              <div className="col-md-10 text-left"> <img  src={file} alt="file"/> &nbsp;&nbsp;{this.props.file.name} </div>
              <div className="col-md-2"><FileButton /> </div>
            </div>
             : ''
      	}
      
       <hr />
      </div>
    );
  }
}