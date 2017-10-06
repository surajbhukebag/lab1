import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import HomeLeftNav from './HomeLeftNav';
import FilesMainHome from './FilesMainHome';
import HomeRightNav from './HomeRightNav';

class FilesHome extends Component {

	render() {
		return(

			<div className="container-fluid">
               
        <div className="row">
          <div className="col-md-2"><HomeLeftNav /></div>
          <div className="col-md-8"><FilesMainHome /></div>
          <div className="col-md-2"><HomeRightNav /></div>
        </div>

      </div>

			)
	}

}

export default withRouter(FilesHome);