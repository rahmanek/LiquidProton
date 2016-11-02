import { React, ReactRouter } from '../cdn'
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
					icon: "fa-bar-chart"
				},{
					name: "API Key",
					link:"apiKey",
					icon: "fa-key"
				},{
					name:"Account",
					link:"account",
					icon: "fa-user-o"
				},{
					name: "Support",
					link: "support",
					icon: "fa-comment-o"
				},{
					name: "Documentation",
					link: "docs",
					icon: "fa-book"
				},{
					name: "Logout",
					link:"logout",
					icon: "fa-sign-out"
				}
			]
		}
	},
	logout: function(){
		User.deleteAuthorization();
		browserHistory.push("login");
	},
	render: function (){
		var frag = window.location.hash.split("?")[0];
		return (
			<div id="nav">
				{
					this.state.nav.map((item, i)=>{
						if (item.name == "Logout") return(
							<div key={i} className="linkBox">
								<a href="javascript:" onClick={this.props.auth.logout}>
									<i className={"fa fa-fw color-primary-muted " + item.icon}></i>
									<span>&nbsp;&nbsp;{item.name}</span>
								</a>
							</div>
						);
						else return(
							<div key={i} className="linkBox">

								<Link to={item.link}>
									<i className={"fa fa-fw color-black color-primary-muted " + item.icon}></i>
									<span>&nbsp;&nbsp;{item.name}</span>
								</Link>
							</div>
						);
					})
				}
			</div>
		);
	}
});
