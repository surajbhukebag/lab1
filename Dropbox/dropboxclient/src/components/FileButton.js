import React from 'react';
import {connect} from 'react-redux';
import {fileDelete} from "../actions/files";
import {generateLink} from "../actions/files";
import { Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class FileButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModle = this.toggleModle.bind(this);
    this.toggleShareModle = this.toggleShareModle.bind(this);
    this.handleOnclick = this.handleOnclick.bind(this);
    this.state = {
      dropdownOpen: false,
      modal: false,
      shareModal: false
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

  handleOnclick() {
    this.props.fileDelete(this.props.attr, this.props.email, this.props.pwd);
    this.toggleModle();
  }

  render() {

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle>
          ...
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <p onClick={this.toggleShareModle}>Share</p>
            <Modal isOpen={this.state.shareModal} toggle={this.toggleShareModle} className={this.props.className}>
              <ModalHeader>Share {this.props.attr.name} ?</ModalHeader>
              <ModalBody>
                  <div className="container-fluid">
                  {this.props.attr.isDirectory ? ''  :
                  <div>
                    <div className="row">
                      <div className="col-md-4"><Button color="primary" onClick={() => {this.props.generateLink(this.props.attr,this.props.email)}}>Generate Link</Button></div>         
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-12"><Input type="textarea" readOnly name="link" placeholder={this.props.link} /></div>
                    </div>
                    </div>
                }
           
                 <br/>
                 <div className="row">
                  <div className="col-md-4"><Button color="primary">Share By Email or Name</Button></div>
                  </div>
                  <br/>
                 <div className="row">
                    <div className="col-md-12"><Input type="text" name="emails" placeholder="Enter Email or Name" /></div>
                 </div>
                 </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleShareModle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </DropdownItem>
          {this.props.type === 'file' ? <DropdownItem>Download</DropdownItem> : ''}
          {this.props.isStar === 'Y' ? '' :
           <DropdownItem>
          <p onClick={this.toggleModle}>Delete</p>
            <Modal isOpen={this.state.modal} toggle={this.toggleModle} className={this.props.className}>
              <ModalHeader>Delete Confirmation</ModalHeader>
              <ModalBody>
                Are you sure ?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => {this.handleOnclick()}} >Confirm</Button>{' '}
                <Button color="secondary" onClick={this.toggleModle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </DropdownItem>
          }
         
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        fileDelete : (data, email, pwd) => dispatch(fileDelete(data, email, pwd)),
        generateLink : (data, email) => dispatch(generateLink(data, email))
    };
}

function mapStateToProps(user) {
  if(user.user.user.basic != null) {
      const email = user.user.user.basic.email;
      let pwd = "/";
      let link = "Generate Link";
      if(user.files.files != null ) {
        pwd = user.files.files.pwd;
        link = user.files.link;    
      }
      return {email, pwd, link};
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (FileButton);