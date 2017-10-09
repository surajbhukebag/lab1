import React from 'react';
import {connect} from 'react-redux';
import {fileDelete} from "../actions/files";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class FileButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModle = this.toggleModle.bind(this);
    this.state = {
      dropdownOpen: false,
      modal: false
    };
  }

    toggleModle() {
    this.setState({
      modal: !this.state.modal
    });
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
          {this.props.type === 'file' ? <DropdownItem>Download</DropdownItem> : ''}
          <DropdownItem>
          <p onClick={this.toggleModle}>Delete</p>
            <Modal isOpen={this.state.modal} toggle={this.toggleModle} className={this.props.className}>
              <ModalHeader>Delete Confirmation</ModalHeader>
              <ModalBody>
                Are you sure ?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => {this.props.fileDelete(this.props.attr, this.props.email, this.props.pwd)}} >Confirm</Button>{' '}
                <Button color="secondary" onClick={this.toggleModle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        fileDelete : (data, email, pwd) => dispatch(fileDelete(data, email, pwd))
    };
}

function mapStateToProps(user) {
  if(user.user.user.basic != null) {
      const email = user.user.user.basic.email;
      let pwd = "/";
      if(user.files.files != null ) {
        pwd = user.files.files.pwd;
      }
      return {email, pwd};
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (FileButton);