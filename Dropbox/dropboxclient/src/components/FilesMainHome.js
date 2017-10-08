import React from 'react';
import { Alert, Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import text from './../images/1.svg';
import logo from './../images/2.svg';
import Item from './Item';
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class FilesMainHome extends React.Component {

  render() {
    return (
      <div className="pt-5">       
       <p className="text-left">Dropbox</p>
       <br/>
       
       <hr/>
       {
          this.props.fileList.length > 0 ?
          this.props.fileList.map((file) => {
          
            return(
                   <Item file={file}/>
              );
          
          }) : <div><Alert color="danger">No Files available</Alert> </div>       
       }

                         
       
       <br/>
      </div>
    );
  }
}


function mapStateToProps(files) {
  if(files.files != null) {
      const fileList = files.files.files.files;
      return {fileList};
  }
    
}

export default withRouter(connect(mapStateToProps, null) (FilesMainHome));