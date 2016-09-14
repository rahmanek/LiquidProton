import React from 'react'
import { render } from 'react-dom'
import Header from './Common/header.js'
import Notifications from './Common/notifications.js'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
require('bootstrap/js/alert');

export default React.createClass({
	getInitialState: function() {
		return{
			notifications:[],
			user:{}
		}
	},
	createNotification: function(notification){
		var notifications = this.state.notifications;
		notifications.push(notification);
		this.setState({notifications:notifications});

		return;
	},
	removeNotification: function(nIndex){
		var notifications = this.state.notifications;
		notifications.splice(nIndex,1);
		return this.setState({notifications:notifications});
	},
	retrieveNotifications: function(){
		return this.state.notifications;
	},
	componentWillReceiveProps:function(nextProps){
		// Remove notifications when view changes
		if(this.props.location.pathname != nextProps.location.pathname){
			var notifications = [];
			if (typeof nextProps.location.query.message != "undefined") notifications.push({message:nextProps.location.query.message});
			this.setState({notifications:notifications});
		}
		return;
	},
	render: function (){
		var pass = {
			notification:{
				create: this.createNotification,
				remove: this.removeNotification,
				retrieve: this.retrieveNotifications
			},
			user:this.state.user
		}
		return (
         <div className="height-100">
            <Header notification={pass.notification}/>
				<div className="page-body">
					{React.cloneElement(this.props.children, pass)}
				</div>
         </div>
		);
	}
});
