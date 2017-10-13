import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import text from './../images/1.svg';
import logo from './../images/2.svg';
import {listfiles} from "../actions/files";
import {getSharedfiles} from "../actions/files";
import { Route, withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux';

class HomeLeftNav extends React.Component {

  render() {
    return (
      <div className="pt-5">       
        <div><img  src={logo} alt="fireSpot"/></div><br/><br/>
        <Nav vertical>
          <NavItem>
            <Link to="/home">Home</Link>
          </NavItem>
          <NavItem>
            <br/>
          </NavItem>
          <NavItem>
            <Link to="/files" onClick={() => {this.props.getListfiles("/", this.props.email)}}>Files</Link>
          </NavItem>
          <NavItem>
            <br/>
          </NavItem>
          <NavItem>
            <Link to="/sharing" onClick={() => {this.props.getSharedfiles(this.props.email)}}>Sharing</Link>
          </NavItem>
          <NavItem>
            <br/>
          </NavItem>
          <NavItem>
            <Link to="/files">Group</Link>
          </NavItem>
        </Nav>       
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        getListfiles : (data, email) => dispatch(listfiles(data, email)),
        getSharedfiles : (email) => dispatch(getSharedfiles(email))
    };
}

function mapStateToProps(user) {
  if(user.user.user.basic != null) {
      const email = user.user.user.basic.email;
      return {email};
  }
    
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (HomeLeftNav));