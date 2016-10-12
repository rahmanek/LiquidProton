import { React, ReactRouter } from '../cdn'
import User from '../classes/User.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	logout: function(){
		User.deleteAuthorization();
		browserHistory.push("login");
	},
	render: function (){
		var frag = window.location.hash.split("?")[0];
		var isAgent = (typeof this.props.user.type != "undefined" && this.props.user.type == "agent");
		return (
			<div id="sidenav" className="margin-top-30">
				<div className="list-group">
					<div id="linkBox" className="list-group">
						<Link to="activities" activeClassName="active" className={"list-group-item" + ((isAgent)?" display-none":"")}>
							Activity
						</Link>
						<Link to="/links" activeClassName="active"  className={"list-group-item" + ((isAgent)?" display-none":"")}>
							Links
						</Link>
						<Link to="/apiKeys" activeClassName="active"  className={"list-group-item" + ((isAgent)?"":" display-none")}>
							API Keys
						</Link>
						<Link to="/create" activeClassName="active" className={"list-group-item" + ((isAgent)?"":" display-none")}>
							Create
						</Link>
						<Link to="/settings" activeClassName="active" className="list-group-item">
							Settings
						</Link>
						<Link to="/help" activeClassName="active" target="_blank"  className="list-group-item">
							Help
						</Link>
						<a id="signout" className="list-group-item" href="javascript:" onClick={this.logout}>Sign Out</a>
					</div>
				</div>
			</div>
		);
	}
});
