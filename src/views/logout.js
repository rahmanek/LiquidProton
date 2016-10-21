import { React, ReactRouter } from '../cdn'
import Header from '../components/header.js'
import config from '../../config.js'
import User from '../classes/User.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	componentWillMount: function(){
		this.props.modifyUser({});
		browserHistory.push("login");
	},
	render: function (){
		return (
			<div></div>
		);
	}
});
