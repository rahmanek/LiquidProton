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
				{/* <div className="container">
					<div className="col-md-4">
						Resources
						<ul className="margin-top-10">
							<li>Help</li>
						</ul>
					</div>
					<div className="col-md-4">
						Contact
					</div>
					<div className="col-md-4">
						Other
					</div>
				</div> */}
			</div>
		);
	}
});
