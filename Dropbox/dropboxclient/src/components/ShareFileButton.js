import React from 'react';
import {connect} from 'react-redux';
import {fileDelete} from "../actions/files";
import {generateLink} from "../actions/files";
import {sharewithPpl} from "../actions/files";
import {starAFile} from "../actions/files";

import { Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class ShareFileButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModle = this.toggleModle.bind(this);
    this.toggleShareModle = this.toggleShareModle.bind(this);
    this.state = {
      dropdownOpen: false,
      modal: false,
      shareModal: false,
      sharedwith : ""
    };
  }

    toggleModle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleShareModle() {
        this.setState({
      shareModal: !this.state.shareModal
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  handleDownload() {
        fetch(`http://localhost:3001/getSharedFileDownloadLink`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({userId:this.props.attr.owner, path:this.props.attr.path})
        }).then((response) => response.json())
        .then((responseJson) => {
            window.open(responseJson.link);
        }).catch(error => {
        });
  }

  render() {

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle>
          ...
        </DropdownToggle>
        <DropdownMenu>

          {this.props.type === 'file' ? <DropdownItem onClick={() => {this.handleDownload()}}>Download</DropdownItem> : ''}

        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}


function mapStateToProps(user) {
  if(user.user.user.basic != null) {
      const email = user.user.user.basic.email;
      const userId = user.user.user.basic.id;
      let pwd = "/";
      let link = "Generate Link";
      if(user.files.files != null ) {
        pwd = user.files.files.pwd;
        link = user.files.link;    
      }
      let ul = "http://localhost:3001/fileDownload/"+email+"/";
      return {email, pwd, link, ul, userId};
  }
}

export default connect(mapStateToProps, null) (ShareFileButton);