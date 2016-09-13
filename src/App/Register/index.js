import React from 'react'
import { render } from 'react-dom'
import CardForm from '../Common/cardForm.js'

export default React.createClass({
	getInitialState: function() {
	   	return {
				editMode: false
		 	};
	},

	render: function (){
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<div id="register" className="margin-top-30 margin-bottom-30">
							<div className="col-xs-6 givenNameBox">
								<div className="col-xs-12">
									<span className="cursor-default">First Name</span>
								</div>
								<div className="col-xs-12 margin-top-5">
									<input className="col-xs-12 border-none" value={this.state.givenName} onChange={this.handleChange} type="text" id="givenName" name="full_name" placeholder="Cardholder first name here"/>
								</div>
							</div>
							<div className="col-xs-6 surNameBox">
								<div className="col-xs-12">
									<span className="cursor-default">Last Name</span>
								</div>
								<div className="col-xs-12 margin-top-5">
									<input className="col-xs-12 border-none" value={this.state.surName} onChange={this.handleChange} type="text"  id="surName" name="full_name" placeholder="Cardholder last name here"/>
								</div>
							</div>
							<CardForm></CardForm>
							<div className="row margin-top-25 margin-bottom-15">
								<button className="btn col-xs-4 col-xs-offset-4" id="submit-button" onClick={this.submitPaymentForm}>Add</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
