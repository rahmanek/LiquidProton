import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import User from '../../classes/User.js'
export default React.createClass({
	getInitialState: function() {
		return{
		}
	},
	logout: function(){
		User.deleteAuthorization();
		window.location = "/home";
	},
	render: function (){
		var frag = window.location.hash.split("?")[0];
		var classes = "list-group-item";
		var activitiesClasses=classes, linksClasses=classes, apiClasses=classes, settingsClasses=classes, helpClasses=classes, signoutClasses=classes, createClasses=classes;
		if (frag == "/") activitiesClasses += " active";
		else if (frag == "/links") linksClasses += " active";
		else if (frag == "/settings") settingsClasses += " active";
		else if (frag == "/help") helpClasses += " active";
		else if (frag == "/apiKeys") apiClasses += " active";
		else if (frag == "/create") createClasses += " active";

		if(typeof this.props.user.type != "undefined" && this.props.user.type == "agent"){
			activitiesClasses += " display-none";
			linksClasses += " display-none";
		} else if(typeof this.props.user.type != "undefined" && this.props.user.type == "user") {
			apiClasses += " display-none";
			createClasses += " display-none"
		}
		return (
			<div id="sidenav" className="margin-top-30">
				<div className="list-group">
					<div id="linkBox" className="list-group">
						<Link to="/" className={activitiesClasses}>
							Activity
						</Link>
						<Link to="/links"  className={linksClasses}>
							Links
						</Link>
						<Link to="/apiKeys"  className={apiClasses}>
							API Keys
						</Link>
						<Link to="/settings"  className={settingsClasses}>
							Settings
						</Link>
						<Link to="/create"  className={createClasses}>
							Create
						</Link>
						<Link to="/help"  className={helpClasses}>
							Help
						</Link>
						<a id="signout" className="list-group-item" href="javascript:" onClick={this.logout}>Sign Out</a>
					</div>
				</div>
			</div>
		);
	}
});
