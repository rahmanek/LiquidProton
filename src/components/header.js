import { React, ReactRouter } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({

	render: function (){
		var auth = this.props.auth;
		var headerAddition = (<li className="nav-item"></li>)
		if(!auth.isLoggedIn()) headerAddition = (
			<li className="nav-item">
				<a href="javascript:" className="nav-link" onClick={()=>auth.login()}>Login</a>
			</li>
		);
		else if(auth.isLoggedIn() && !this.props.nav) headerAddition = (
			<li className="nav-item">
				<Link to="dash" className="nav-link">Dashboard</Link>
			</li>
		);

		return (
			<div id="header">
				<nav className="navbar navbar-fixed-top">
					<div className="container fix-width">
					<span className="navbar-brand" href="#">Hi</span>
					<ul className="nav navbar-nav hidden-sm-down float-xs-right">
						{headerAddition}
					</ul>
					<a href="javascript:" className="navbar-toggler float-xs-right hidden-md-up" data-toggle="collapse" data-target="#exCollapsingNavbar">
						<i className="fa fa-bars"></i>
					</a>
					</div>
				</nav>
			</div>
		);
	}
});
