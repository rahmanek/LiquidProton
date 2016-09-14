import React from 'react'
import { render } from 'react-dom'
import CardForm from '../Common/cardForm.js'

export default React.createClass({
	getInitialState: function() {
	   	return {
				email:""
		 	};
	},

	render: function (){
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<div id="register" className="page-content">
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
							<div className="col-xs-6 emailBox">
								<div className="col-xs-12">
									<span className="cursor-default">Email</span>
								</div>
								<div className="col-xs-12 margin-top-5">
									<input className="col-xs-12 border-none" value={this.state.email} onChange={this.handleChange} type="text"  id="email" placeholder="Email"/>
								</div>
							</div>
							<div className="col-xs-6 passwordBox">
								<div className="col-xs-12">
									<span className="cursor-default">Password</span>
								</div>
								<div className="col-xs-12 margin-top-5">
									<input className="col-xs-12 border-none" value={this.state.password} onChange={this.handleChange} type="password"  id="password" placeholder="Password Here"/>
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
