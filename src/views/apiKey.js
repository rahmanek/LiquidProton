import { React, ReactRouter, $ } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

var Link = ReactRouter.Link;

export default React.createClass({
	getInitialState: function() {
	   	return {
				keys: []
		 	};
	},
	getUser: function(){
		User.retrieve();
	},

	render: function(){
		return (
			<div id="apiKey">
				<span onClick={this.getUser}>API Key</span>
			</div>
		);
	}
});
