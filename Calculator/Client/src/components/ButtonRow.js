import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addOperands} from "../actions/index";
import {addOperators} from "../actions/index";

class ButtonRow extends Component {


	render() {

		return(

				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-xs-3 col-sm-3 col-md-3">
								<button className="btn btn-default"  onClick={() => {
                                      this.props.addToRedux(this.props.n1);}}><strong>{this.props.n1}</strong></button>
							</div>
							<div className="col-xs-3 col-sm-3 col-md-3">
								<button className="btn btn-default" onClick={() => {
                                      this.props.addToRedux(this.props.n2);}}><strong>{this.props.n2}</strong></button>
							</div>
							<div className="col-xs-3 col-sm-3 col-md-3">
								<button className="btn btn-default" onClick={() => {
                                      this.props.addToRedux(this.props.n3);}}><strong>{this.props.n3}</strong></button>
							</div>
							<div className="col-xs-3 col-sm-3 col-md-3">
								<button className="btn btn-default" onClick={() => {
                                      this.props.addOperator(this.props.n4);}}><strong>{this.props.n4}</strong></button>
							</div>
						</div>
					</div>
				</div>
		);
	}
}



function mapDispatchToProps(dispatch) {
    return {
        addToRedux : (data) => dispatch(addOperands(data)),
        addOperator : (data) => dispatch(addOperators(data))
    };
}



export default connect(null, mapDispatchToProps)(ButtonRow);