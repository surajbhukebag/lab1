import React from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Input, Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from './../images/user.png';
import { Link } from 'react-router-dom';
import {fileUpload} from "../actions/files";
import NewFolder from "./NewFolder";

class HomeRightNav extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  
  handleFileUpload = (event) => {
      const data = new FormData();
      data.append('file', event.target.files[0]);
      data.append('name', this.props.email);
      this.props.upload(data, this.props.email);
  }


  render() {
    return (
      <div className="pt-5">       
          <div className="row">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle>
                <img  src={logo} alt="fireSpot"/>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Suraj Bhukebag</DropdownItem>
                <DropdownItem divider />
                <DropdownItem><Link to="/settings">Settings</Link></DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Sign Out </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </div>
          <br /><br /><br />
          <div className="row">
             <Nav vertical>
              <NavItem>
                <label className="btn-bs-file btn btn-xs btn-primary">
                  Upload<input type="file" hidden  onChange={this.handleFileUpload} />
               </label>
              </NavItem>
               <NavItem>
                <NewFolder buttonLabel="Create Folder"/>
              </NavItem>
              <NavItem>
                <NavLink href="#">New Shared File</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">New Group</NavLink>
              </NavItem>
           </Nav>       
          </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        upload : (data, email) => dispatch(fileUpload(data, email))
    };
}

function mapStateToProps(user) {
  if(user.user.user.basic != null) {
      const email = user.user.user.basic.email;
      return {email};
  }
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (HomeRightNav));