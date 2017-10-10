import React from 'react';
import { Alert, Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import text from './../images/1.svg';
import logo from './../images/2.svg';
import Item from './Item';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

class HomeMain extends React.Component {

  render() {
    return (
      <div className="pt-5">       
       <p className="text-left"><strong>Home</strong></p>
       <br/>
       <p className="text-left">Starred</p>
       <div><hr/>
       {this.props.starred.length > 0 ?
        this.props.starred.map((file) => {          
            return(
                   <Item file={file}/>
              );          
          })
        :
        <Alert color="info">No Starred Items</Alert>
       }
       
       <br/>
       <p className="text-left">Recent</p>
       <hr/>
       
       <br/>
       </div>
      </div>
    );
  }
}

function mapStateToProps(user) {
  if(user.user.user.starred != null) {
      const starred = user.user.user.starred
      return {starred};
  }
    
}

export default withRouter(connect(mapStateToProps, null) (HomeMain));