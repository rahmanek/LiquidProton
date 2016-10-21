import { React, ReactRouter } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'
import Navigation from './navigation.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
		return{
			navItems:[
				{
					name:"Dev",
					link:"",
					user: true,
					agent: true,
					public: true
				},{
					name:"Activity",
					link:"activities",
					user: true,
					agent: false,
					public: false
				},{
					name: "API Keys",
					link:"apiKeys",
					user: false,
					agent: true,
					public: false
				},{
					name: "Create",
					link:"create",
					user: false,
					agent: true,
					public: false
				},{
					name:"Settings",
					link:"settings",
					user:true,
					agent:true,
					public: false
				},{
					name:"Help",
					link:"help",
					user:true,
					agent:true,
					public: false
				},{
					name: "Sign Out",
					link:"logout",
					user: true,
					agent: true,
					public: false
				},{
					name: "About",
					link: "",
					user: false,
					agent: false,
					public: false
				}
			]
		}
	},
	loginRandom: function(){
		$.get(config.apiHost + "/user/authenticateRandom")
		.then((data)=>{
			User.setAuthorization(data.authorization);
			browserHistory.push("activities");
			window.location.reload();

		}).catch( (err) => {
			this.props.notification.create({message:"A random user could not be logged in.",type:"danger"});
		});
	},
	loginRandomAgent: function(){
		$.get(config.apiHost + "/user/authenticateRandomAgent")
		.then((data)=>{
			User.setAuthorization(data.authorization);
			browserHistory.push("apiKeys");
			window.location.reload();
		}).catch( (err) => {
			this.props.notification.create({message:"A random agent could not be logged in.",type:"danger"});
		});
	},
	render: function (){
		var type = this.props.user.type;
		if (typeof type == "undefined") type = "public";
		var isAgent = true;
		return (
			<div id="header">
				<nav className="navbar navbar-fixed-top">
					<div className="container">
					<span className="navbar-brand" href="#">Hi</span>
					<ul className="nav navbar-nav hidden-sm-down float-xs-right">
						{
							this.state.navItems.map((item)=>{
								if(item.name == "Dev"){
									return(
										<li className="nav-item dropdown">
											<a href="javascript:" className="nav-link dropdown-toggle" data-toggle="dropdown" id="responsiveNavbarDropdown">{item.name}</a>
											<div className="dropdown-menu">
												<a className="dropdown-item" href="javascript:" onClick={this.loginRandom}>Login Random User</a>
												<a className="dropdown-item" href="javascript:" onClick={this.loginRandomAgent}>Login Random Agent</a>
											</div>
										</li>
									);
								} else if (item[type]){
									return (
										<li className="nav-item">
											<Link to={item.link} className="nav-link">{item.name}</Link>
										</li>
									);
								} else return null;
							})
						}
					</ul>
					<a href="javascript:" className="navbar-toggler float-xs-right hidden-md-up" data-toggle="collapse" data-target="#exCollapsingNavbar">
						<i className="fa fa-bars"></i>
					</a>
					</div>
				</nav>
				<div className="collapse collapseMenu" id="exCollapsingNavbar">
					<div className="bg-inverse text-muted p-1 height-100vh">
						<h4>Menu</h4>
						<ul className="list-group">
							{
								this.state.navItems.map((item)=>{
									if(item.name == "Dev") return null;
									else if (item[type] && item.name != "Dev"){
										return (
											<div>
												<a className="list-group-item" href="javascript:">{item.name}</a>
												<hr/>
											</div>
										);
									} else return null;
								})
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
});
