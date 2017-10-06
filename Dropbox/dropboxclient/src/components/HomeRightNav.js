import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from './../images/user.png';

export default class HomeRightNav extends React.Component {

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
                <DropdownItem><a href="settings">Settings</a></DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Sign Out </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </div>
          <br /><br /><br />
          <div className="row">
             <Nav vertical>
              <NavItem>
                 <Button color="primary">Upload Files</Button>{' '}
              </NavItem>
               <NavItem>
                <NavLink href="#">New Folder</NavLink>
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