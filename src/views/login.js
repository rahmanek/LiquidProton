import React from 'react'
import { render } from 'react-dom'
import Header from '../components/header.js'
import config from '../../config.js'
import User from '../classes/User.js'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
import { browserHistory, Link } from 'react-router'
require('bootstrap/js/alert');

export default React.createClass({
	getInitialState: function() {
	   	return {
				email: "",
				password: ""
		 	};
	},
	authenticate:function(){
		var postData = {
			email:this.state.email,
			password:this.state.password
		}
		$.post(config.apiHost + "/user/authenticate", postData)
		.then((data)=>{
			User.setAuthorization(data.authorization);
			browserHistory.push("activities")
		}).catch((err) => {
			this.props.notification.create({message:"The email or password is incorrect, please try again.",type:"danger"});
		});
	},
	handleChange: function(event) {
		var changeVar = {};
		changeVar[event.target.id] = event.target.value;
		return this.setState(changeVar);
	},
	render: function (){
		return (
			<div id="home" className="margin-top-30 margin-bottom-30">
				<div className="container">
					<div className="row margin-top-50">
						<div className="col-xs-4 col-xs-offset-4">
							<div id="authBox" className="panel panel-default">
								<div className="font-size-20  primary-color">Login</div>
								<div className="margin-top-15">Email</div>
								<input id="email" onChange={this.handleChange} className="form-control margin-top-5"/>
								<div className="margin-top-15">Password</div>
								<input id="password" type="password" onChange={this.handleChange} className="form-control margin-top-5"/>
								<button className="btn margin-top-10 margin-left-auto margin-right-25 display-block btn-primary" onClick={this.authenticate}>Login</button>
								<Link to="register">
									<div className="margin-top-10 text-black">Need to create an account?</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
