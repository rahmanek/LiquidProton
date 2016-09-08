import React from 'react'
import { render } from 'react-dom'
import Header from '../Common/header.js'
import config from '../../../config.js'
import User from '../../classes/User.js'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
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
			$.get(config.apiHost + "/user/authenticateRandom")
			.then((data)=>{
				User.setAuthorization(data.authorization);
				window.location = "/";
			}).catch((err) => {
				this.props.notification.create({message:"A random user could not be logged in.",type:"danger"});
			});
		} else {

		}
	},
	render: function (){
		return (
			<div id="home" className="margin-top-30 margin-bottom-30">
				<div className="container">
					<div className="row">
						<div className="col-xs-8">
							Homess
						</div>
						<div className="col-xs-4">
							<div id="authBox" className="panel panel-default">
								<div className="font-size-20">{(this.state.login)?"Login":"Register"}</div>
								<div className="margin-top-15">Email</div>
								<input className="form-control margin-top-5"/>
								<div className="margin-top-15">Password</div>
								<input className="form-control margin-top-5"/>
								<button className="btn margin-top-10 margin-left-auto margin-right-25 display-block" onClick={this.authenticate}>{(this.state.login)?"Login":"Sign Up"}</button>
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
