import { React, ReactRouter } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'
import Navigation from './navigation.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	render: function (){

		return (
			<div id="footer">
				<div className="container">
					<div className="col-md-4">
						<div className="margin-bottom-10">Resources</div>
						<div>For Customers</div>
						<div>For Retailers</div>
						<div>For Developers</div>
						<div>Help</div>
					</div>
					<div className="col-md-4">
						<div className="margin-bottom-10">Resources</div>
						<div>About</div>
					</div>
					<div className="col-md-4">
						<div className="margin-bottom-10">Contact</div>
						<div>Call: (888)930-2938</div>
						<div>Email: info@hi.com</div>
					</div>
				</div>
			</div>
		);
	}
});
