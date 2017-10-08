import React from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {createFolder} from "../actions/files";
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class NewFolder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      "email":"",
      "path":"",
      "foldername":""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  navigate() {
    this.props.history.push('/home');
  }

  
  handleFileUpload = (event) => {
      
      this.state.email = this.props.email;
      this.state.path = "/";
      console.log(this.props.email);
      this.props.createFolder(this.state);
  }

  render() {

    if(this.props.isLoggedIn){
      this.navigate();
    }

    return (
      <div>
        <Button outline color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>Create Folder</ModalHeader>
          <ModalBody>
            <Form>
                <FormGroup>
                  <Label for="folder">Folder Name</Label>
                  <Input type="text" name="folder" id="semail" placeholder="Folder Name" onChange={(event) => {
                                    this.setState({
                                        foldername: event.target.value
                                    });
                                }} />
                </FormGroup>                
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleFileUpload} >Create Folder</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        createFolder : (data) => dispatch(createFolder(data))
    };
}

function mapStateToProps(user) {
  if(user.user.user.basic != null) {
      const email = user.user.user.basic.email;
      return {email};
  }
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (NewFolder));