import React, {Component} from 'react';

import ButtonRow from './ButtonRow';
import {connect} from 'react-redux';
import {perofrmOperation} from "../actions/index";

class Calculator extends Component {

	render() {
		return(

				<div className="container-fluid mt-5">
					<div className="row justify-content-md-center" >				
							<div className="panel panel-default">
								<div className="panel-heading">
									<label><h3>Calculator</h3></label>
								</div>
								<div className="panel-body">
									<input type="text" className="form-control" placeholder={this.props.expression} />
									<br/>
									<ButtonRow n1="1" n2="2" n3="3" n4="+"/>
									<br/>
									<ButtonRow n1="4" n2="5" n3="6" n4="-"/>
									<br/>
									<ButtonRow n1="7" n2="8" n3="9" n4="*"/>
									<br/>
									<ButtonRow n1="." n2="0" n3="C" n4="/"/>
									<br />
									<button className="btn btn-default" onClick={() => {
                                      this.props.calculate(this.props.expression);}}><strong>Ans</strong></button>

								</div>
							</div>
					</div>					
				</div>
    
		);
	}
}

function mapStateToProps(calc) {
	if(calc != null) {
	    const expression = calc["display"];

	    return {expression};
	}
    
}

function mapDispatchToProps(dispatch) {
    return {
        calculate : (data) => dispatch(perofrmOperation(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Calculator);