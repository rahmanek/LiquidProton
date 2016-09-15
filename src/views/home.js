import React from 'react'
import { render } from 'react-dom'
import Header from '../components/header.js'
import config from '../../config.js'
import User from '../classes/User.js'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
import { browserHistory } from 'react-router'
require('bootstrap/js/alert');

export default React.createClass({
	getInitialState: function() {
	   	return {
				email: "",
				password: "",
				login: true
		 	};
	},
	toggleAuth: function(){
		this.setState({login:!this.state.login});
	},
	authenticate:function(){
		if(this.state.login){
			var postData = {
				email:this.state.email,
				password:this.state.password
			}
			$.post(config.apiHost + "/user/authenticate", postData)
			.then((data)=>{
				User.setAuthorization(data.authorization);
				window.location = "/";
			}).catch((err) => {
				this.props.notification.create({message:"The email or password is incorrect, please try again.",type:"danger"});
			});
		} else {
			var postData = {
				email:this.state.email,
				password:this.state.password
			}
			$.post(config.apiHost + "/user/create", postData)
			.then((data)=>{
				User.setAuthorization(data.authorization);
				window.location = "/";
			}).catch((err) => {
				this.props.notification.create({message:"There was a problem registering your account",type:"danger"});
			});
		}
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
					<div className="row">
						<div className="col-xs-8">
							<div className="panel panel-default">
								Welcome!<br/><br/>This will be an awesome app someday...
							</div>
						</div>
						<div className="col-xs-4">
							<div id="authBox" className="panel panel-default">
								<div className={"font-size-20 " + ((this.state.login)?"primary-color":"secondary-color")}>{(this.state.login)?"Login":"Register"}</div>
								<div className="margin-top-15">Email</div>
								<input id="email" onChange={this.handleChange} className="form-control margin-top-5"/>
								<div className="margin-top-15">Password</div>
								<input id="password" type="password" onChange={this.handleChange} className="form-control margin-top-5"/>
								<button className={"btn margin-top-10 margin-left-auto margin-right-25 display-block " + ((this.state.login)?"btn-primary":"btn-secondary")} onClick={this.authenticate}>{(this.state.login)?"Login":"Sign Up"}</button>
								<div className="margin-top-10 cursor-hand"
									onClick={this.toggleAuth}>{(this.state.login)?"Need to create an account?":"Already have an account?"}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
