import { React, ReactRouter} from './cdn'
import Header from './components/header.js'
import Notifications from './components/notifications.js'
import Navigation from './components/navigation.js'
import { getQueryVariable } from './utilities.js'
import User from './classes/User.js'
import config from '../config.js'

var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
		return{
			notifications:[],
			user:{}
		}
	},
	modifyUser: function(user){
		this.setState({user:user});
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
	componentDidMount: function(){

		var notifications = this.state.notifications;
		if (typeof getQueryVariable("message") != "undefined") notifications.push({message:getQueryVariable("message").split("+").join(" ")});

		return;
	},
	render: function (){
		var pass = {
			notification:{
				create: this.createNotification,
				remove: this.removeNotification,
				retrieve: this.retrieveNotifications
			},
			auth: this.props.route.auth,
			user:this.state.user,
			modifyUser:this.modifyUser
		}
		return (
         <div className="height-100">
				<Notifications notification={pass.notification}/>
            <Header notification={pass.notification} auth={this.props.route.auth}/>
				<div className="page-body">
					{React.cloneElement(this.props.children, pass)}
				</div>
         </div>
		);
	}
});
