import { React, ReactRouter } from '../cdn'
import Header from '../components/header.js'
import config from '../../config.js'
import User from '../classes/User.js'
import Footer from '../components/Footer.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
   	return {
			email: "",
			password: ""
	 	};
	},

	render: function (){
		return (
			<div id="landing">

			</div>
		);
	}
});
