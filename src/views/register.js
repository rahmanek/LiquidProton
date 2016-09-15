import React from 'react'
import { render } from 'react-dom'
import CardForm from '../components/cardForm.js'
import User from '../classes/User.js'

export default React.createClass({
	getInitialState: function() {
	   	return {
				email:"",
				processCard:false
		 	};
	},
	componentDidMount: function(){
		User.deleteAuthorization();
		return;
	},
	onCompletion: function(token){
		this.setState({processCard:false});
	},
	render: function (){
		return (
			<div id="register" className="views">
				<div className="container height-100 padding-right-0 padding-left-0">
						<div className="col-xs-12 padding-right-0 padding-left-0 height-100 overflow-scroll-y">
								<CardForm processCard={this.state.processCard} onCompletion={this.onCompletion}></CardForm>
								<div className="row padding-left-15 padding-right-15">
									<div className="col-xs-6 border-bottom border-right form-box">
										<div className="cursor-default">Email</div>
										<input className="col-xs-12 border-none margin-top-5" value={this.state.email} onChange={this.handleChange} type="text"  id="email" placeholder="Email"/>
									</div>
									<div className="col-xs-6 border-bottom form-box">
											<span className="cursor-default">Password</span>
											<input className="col-xs-12 border-none margin-top-5" value={this.state.password} onChange={this.handleChange} type="password"  id="password" placeholder="Password Here"/>
									</div>
								</div>
								<div className="row margin-top-25 margin-bottom-15">
									<button className="btn col-xs-4 col-xs-offset-4" id="submit-button" onClick={()=>this.setState({processCard:true})}>Register</button>
								</div>
						</div>
				</div>
			</div>
		);
	}
});
