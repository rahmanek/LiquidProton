import { React, ReactRouter } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
		return{
			nav:[
				{
					name: "Dashboard",
					link: "dash",
					private: true
				},{
					name:"Account",
					link:"account",
					private: true
				},{
					name: "Support",
					link: "support",
					private: true
				},{
					name: "Documentation",
					link: "docs",
					private: true
				},{
					name: "Logout",
					link:"logout",
					private: true
				},{
					name: "Login",
					link:"login",
					private: false
				}
			]
		}
	},

	render: function (){
		var user = this.props.user;

		return (
			<div id="header">
				<nav className="navbar navbar-fixed-top">
					<div className="container fix-width">
					<span className="navbar-brand" href="#">Flectino</span>
					<ul className="nav navbar-nav hidden-sm-down float-xs-right">
						{
							this.state.nav.map((item, i)=>{
								if(user.isLoggedIn() && item.private) return(
									<li key={i} className="nav-item">
										{
											(item.name == "Logout")?
											<a href="javascript:" className="nav-link" onClick={this.props.user.logout}>{item.name}</a>:
											<Link to={item.link} className="nav-link">{item.name}</Link>
										}
									</li>
								);
								else if(!user.isLoggedIn() && !item.private) return(
									<li key={i} className="nav-item">
										<a href="javascript:" className="nav-link" onClick={this.props.user.login}>{item.name}</a>
									</li>
								)
							})
						}
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
