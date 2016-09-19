import React from 'react'
import { render } from 'react-dom'
import config from '../../config.js'
import User from '../classes/User.js'
import { Link } from 'react-router'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
require('bootstrap/js/dropdown');

export default React.createClass({
	getInitialState: function() {
		return{
			isAuthenticated: false
		}
	},
	componentDidMount: function(){
		this.setState({isAuthenticated:(User.getAuthorization() !== null)});
		return;
	},
	loginRandom: function(){
		$.get(config.apiHost + "/user/authenticateRandom")
		.then((data)=>{
			User.setAuthorization(data.authorization);
			window.location = "/";
		}).catch( (err) => {
			this.props.notification.create({message:"A random user could not be logged in.",type:"danger"});
		});
	},
	loginRandomAgent: function(){
		$.get(config.apiHost + "/user/authenticateRandomAgent")
		.then((data)=>{
			User.setAuthorization(data.authorization);
			window.location = "/apiKeys";
		}).catch( (err) => {
			this.props.notification.create({message:"A random agent could not be logged in.",type:"danger"});
		});
	},
	render: function (){
		return (
			<div id="header">
				<div className="container">
					<div className="row">
						<div className="col-xs-6">
							<div className="margin-top-10">
								<div className="btn-group">
									<a href="javascript:" data-toggle="dropdown" className="text-white dropdown-toggle">
										<span className="dropdown-toggle font-size-28">Flectino </span><span className="font-size-12"><i className="fa fa-caret-down"></i></span>
									</a>
									<ul className="dropdown-menu">
										<li><Link to="/home">Home</Link></li>
										<li role="separator" className="divider"></li>
										<li><a href="javascript:" onClick={this.loginRandom}>Login Random User</a></li>
										<li><a href="javascript:" onClick={this.loginRandomAgent}>Login Random Agent</a></li>
									</ul>
								</div>
							</div>
						</div>
						{
							(this.state.isAuthenticated)
								?(<div className="col-xs-6 hidden-sm hidden-md hidden-lg headerMenu text-right">
									<div className="btn-group">
										<Link to=""><i className="fa fa-fw fa-bars margin-right-15 font-size-24"/></Link>
										<Link to="links"><i className="fa fa-fw fa-link margin-right-15 font-size-24"/></Link>
										<Link to="settings"><i className="fa fa-fw fa-wrench font-size-24"/></Link>
									</div>
		      				</div>)
								:(null)
						}
					</div>
				</div>
   		</div>
		);
	}
});
