import { React, ReactRouter } from '../cdn'
import config from '../../config.js'
import Authenticate from '../classes/Authenticate.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
		return{
			authenticate:{},
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
	componentDidMount: function(){
		var authenticate = new Authenticate();
		this.setState({authenticate:authenticate})
	},
	render: function (){

		return (
			<div id="header">
				<nav className="navbar navbar-fixed-top">
					<div className="container fix-width">
						<span className="navbar-brand" href="#">Flectino</span>
						<ul className="nav navbar-nav float-xs-right">
							{
								this.state.nav.map((item, i)=>{
									if(Authenticate.isLoggedIn() && item.private) return(
										<li key={i} className="nav-item">
											{
												(item.name == "Logout")?
												<a href="javascript:" className="nav-link" onClick={Authenticate.logout}>{item.name}</a>:
												<Link to={item.link} className="nav-link">{item.name}</Link>
											}
										</li>
									);
									else if(!Authenticate.isLoggedIn() && !item.private) return(
										<li key={i} className="nav-item">
											<a href="javascript:" className="nav-link" onClick={this.state.authenticate.login}>{item.name}</a>
										</li>
									)
								})
							}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
});
