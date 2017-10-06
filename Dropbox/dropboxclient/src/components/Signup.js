import React from 'react';
import {  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Signup extends React.Component {


  render() {
    return (     

      <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>Password</Label>
          <Col sm={10}>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>First Name</Label>
          <Col sm={10}>
            <Input type="text" name="fname" id="fname" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>Last Name</Label>
          <Col sm={10}>
            <Input type="text" name="lname" id="lname" />
          </Col>
        </FormGroup>
        <Button>Submit</Button>
      </Form>

    );
  }
}

export default Signup;