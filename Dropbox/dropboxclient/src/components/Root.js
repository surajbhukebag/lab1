import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Sigin from './Signin'
import Signup from './Signup'
import NavHeader from './Nav'
import Home from './Home'
import FilesHome from './FilesHome'
import UserSettings from './UserSettings'
import text from './../images/1.svg';
import logo from './../images/2.svg';
import { Button } from 'reactstrap';

class Root extends Component {

	render() {


		return(

			<div>
				
	                <Route exact path="/" render={() => (  
	                	
							<div className="container-fluid mt-5">
			
								<div className="row">
									<NavHeader />

								</div>		                    

			                    <div className="row">
				                    <div className="col-md-6 bg-info">
				                        {"You have landed on my App !!"}
				                        
				                    </div>

				                     <div className="col-md-6">
				                        <Signup />
				                        
				                    </div>
			                    </div>                

		                   	</div>
		                  
	                )}/>

					<Route exact path="/home" render={() => (
	                    <div>
	                       <Home />
	                    </div>
	                )} />    

	                <Route exact path="/files" render={() => (
	                    <div>
	                       <FilesHome />
	                    </div>
	                )} />

	                <Route exact path="/settings" render={() => (
	                    <div>
	                       <UserSettings />
	                    </div>
	                )} />                  
            

	            </div>

           
          
			)
	}

}

export default withRouter(Root);