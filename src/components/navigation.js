import { React, ReactRouter } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	render: function (){
		console.log(this.props)
		var isAgent = (typeof this.props.user.type != "undefined" && this.props.user.type == "agent");
		return (
			<div id="navigation">
				<div className="col-xs-12 font-size-18 text-right full-line-height">
					<span className={((isAgent)?" display-none":"")}>
						<span>&nbsp;&nbsp;&nbsp;</span>
						<Link to="activities" activeClassName="active">
							Activity
						</Link>
						<span>&nbsp;&nbsp;&nbsp;|</span>
					</span>
					<span className={((isAgent)?" display-none":"")}>
						<span>&nbsp;&nbsp;&nbsp;</span>
						<Link to="/links" activeClassName="active">
							Links
						</Link>
						<span>&nbsp;&nbsp;&nbsp;|</span>
					</span>
					<span className={ ((isAgent)?"":" display-none")}>
						<span>&nbsp;&nbsp;&nbsp;</span>
						<Link to="/apiKeys" activeClassName="active">
							API Keys
						</Link>
						<span>&nbsp;&nbsp;&nbsp;|</span>
					</span>
					<span className={ ((isAgent)?"":" display-none")}>
						<span>&nbsp;&nbsp;&nbsp;</span>
						<Link to="/create" activeClassName="active">
							Create
						</Link>
						<span>&nbsp;&nbsp;&nbsp;|</span>
					</span>
					<span>
						<span>&nbsp;&nbsp;&nbsp;</span>
						<Link to="/settings" activeClassName="active">
							Settings
						</Link>
						<span>&nbsp;&nbsp;&nbsp;|</span>
					</span>
					<span>
						<span>&nbsp;&nbsp;&nbsp;</span>
						<Link to="/help" activeClassName="active">
							Help
						</Link>
						<span>&nbsp;&nbsp;&nbsp;|</span>
					</span>
					<span>
						<span>&nbsp;&nbsp;&nbsp;</span>
						<a id="signout" className="" href="javascript:" onClick={this.logout}>Sign Out</a>
						<span>&nbsp;&nbsp;&nbsp;|</span>
					</span>
				</div>
   		</div>
		);
	}
});
