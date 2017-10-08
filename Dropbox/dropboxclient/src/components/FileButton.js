import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class FileButton extends React.Component {
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
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle>
          ...
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Share</DropdownItem>
          <DropdownItem>Download</DropdownItem>
         <DropdownItem>Delete</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}